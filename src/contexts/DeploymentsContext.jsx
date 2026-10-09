/* eslint-disable react-refresh/only-export-components -- Context providers and their matching hooks belong together. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { SAMPLE_DEPLOYMENTS } from '../data/deployments.js'

const DeploymentsContext = createContext(null)

export function DeploymentsProvider({ children }) {
  const [deployments, setDeployments] = useState(SAMPLE_DEPLOYMENTS)
  const timersRef = useRef(new Map())

  const clearTimers = useCallback((deploymentId) => {
    const timers = timersRef.current.get(deploymentId) || []
    timers.forEach((timer) => window.clearTimeout(timer))
    timersRef.current.delete(deploymentId)
  }, [])

  const updateDeployment = useCallback((deploymentId, updates) => {
    setDeployments((current) => current.map((deployment) => (
      deployment.id === deploymentId ? { ...deployment, ...updates } : deployment
    )))
  }, [])

  const retryDeployment = useCallback((deploymentId) => {
    clearTimers(deploymentId)
    updateDeployment(deploymentId, {
      status: 'in-progress',
      progress: 0,
      timestamp: new Date().toISOString(),
      message: 'A retry is running as a frontend simulation.',
      events: ['Mock retry started', 'Preparing sample release'],
    })

    const steps = [25, 52, 78, 100]
    const timers = steps.map((progress, index) => window.setTimeout(() => {
      updateDeployment(deploymentId, progress === 100
        ? {
            status: 'succeeded',
            progress,
            message: 'Mock retry completed successfully. No application was deployed.',
            events: ['Mock retry started', 'Sample build completed', 'Sample health checks passed'],
          }
        : { progress })
      if (progress === 100) timersRef.current.delete(deploymentId)
    }, (index + 1) * 500))
    timersRef.current.set(deploymentId, timers)
  }, [clearTimers, updateDeployment])

  const cancelDeployment = useCallback((deploymentId) => {
    clearTimers(deploymentId)
    updateDeployment(deploymentId, {
      status: 'cancelled',
      message: 'The mock deployment was cancelled in the frontend.',
      events: ['Mock run cancelled by user'],
    })
  }, [clearTimers, updateDeployment])

  useEffect(() => () => {
    timersRef.current.forEach((timers) => timers.forEach((timer) => window.clearTimeout(timer)))
    timersRef.current.clear()
  }, [])

  const value = useMemo(() => ({
    deployments,
    retryDeployment,
    cancelDeployment,
  }), [deployments, retryDeployment, cancelDeployment])

  return <DeploymentsContext.Provider value={value}>{children}</DeploymentsContext.Provider>
}

export function useDeployments() {
  const context = useContext(DeploymentsContext)
  if (!context) throw new Error('useDeployments must be used inside DeploymentsProvider')
  return context
}
