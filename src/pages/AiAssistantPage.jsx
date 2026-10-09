import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, Bot, Check, Clock3, Container, GitBranch, Lightbulb, MessageSquareText, Plus, Send, ShieldAlert, Sparkles, Terminal, Trash2, Wallet, X } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import { AI_SUGGESTED_PROMPTS } from '../data/aiAssistant.js'
import { askMockAssistant } from '../services/mockAiAssistant.js'

const promptIcons = { deployment: GitBranch, logs: Terminal, kubernetes: Container, terraform: GitBranch, cost: Wallet, health: Activity }

function makeConversation() {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title: 'New conversation', messages: [], updatedAt: new Date().toISOString() }
}

function AiAssistantPage() {
  const [conversations, setConversations] = useState(() => [makeConversation()])
  const [activeId, setActiveId] = useState(() => conversations[0]?.id)
  const [draft, setDraft] = useState('')
  const [pendingIds, setPendingIds] = useState(() => new Set())
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')
  const bottomRef = useRef(null)
  const activeConversation = conversations.find((item) => item.id === activeId) || conversations[0]
  const isPending = pendingIds.has(activeConversation.id)
  const messageCount = useMemo(() => conversations.reduce((sum, item) => sum + item.messages.length, 0), [conversations])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [activeConversation.messages.length, isPending])

  const newConversation = () => {
    const conversation = makeConversation()
    setConversations((items) => [conversation, ...items])
    setActiveId(conversation.id)
    setDraft('')
    setNotice('Started a new conversation. History is kept in memory for this page session only.')
  }

  const requestReply = async (conversationId, prompt) => {
    setPendingIds((ids) => new Set(ids).add(conversationId))
    setErrors((items) => { const next = { ...items }; delete next[conversationId]; return next })
    try {
      const reply = await askMockAssistant(prompt)
      setConversations((items) => items.map((item) => item.id === conversationId ? { ...item, messages: [...item.messages, reply], updatedAt: new Date().toISOString() } : item))
    } catch (error) {
      setErrors((items) => ({ ...items, [conversationId]: error instanceof Error ? error.message : 'The demo response could not be generated.' }))
    } finally {
      setPendingIds((ids) => { const next = new Set(ids); next.delete(conversationId); return next })
    }
  }

  const sendMessage = async (message = draft) => {
    const prompt = message.trim()
    if (!prompt || pendingIds.has(activeConversation.id)) return
    const conversationId = activeConversation.id
    setDraft('')
    setNotice('')
    setConversations((items) => items.map((item) => item.id === conversationId ? {
      ...item,
      title: item.messages.length === 0 ? prompt.replace(/\s+/g, ' ').slice(0, 46) + (prompt.length > 46 ? '…' : '') : item.title,
      messages: [...item.messages, { id: `user-${Date.now()}`, role: 'user', content: prompt, createdAt: new Date().toISOString() }],
      updatedAt: new Date().toISOString(),
    } : item))
    await requestReply(conversationId, prompt)
  }

  const handleSubmit = (event) => { event.preventDefault(); sendMessage() }
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSubmit(event) }
  }

  const clearHistory = () => {
    const fresh = makeConversation()
    setConversations([fresh])
    setActiveId(fresh.id)
    setPendingIds(new Set())
    setErrors({})
    setDraft('')
    setNotice('Conversation history cleared from this page session.')
  }

  const lastPrompt = [...activeConversation.messages].reverse().find((message) => message.role === 'user')?.content

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-accent-cyan">AI operations</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">AI DevOps Assistant</h1><p className="mt-2 max-w-2xl text-sm text-orbitra-muted">Explore guided DevOps examples with a conversational demo assistant.</p></div><Badge tone="purple"><span className="inline-flex items-center gap-1.5"><Sparkles size={13}/>Mock AI · no live access</span></Badge></header>

    <div className="flex items-start gap-3 rounded-xl border border-accent-purple/20 bg-accent-purple/5 p-4 text-sm leading-6 text-orbitra-muted" role="note"><ShieldAlert size={18} className="mt-1 shrink-0 text-accent-purple"/><p><span className="font-medium text-orbitra-text">Demonstration responses only.</span> This assistant uses a local mock adapter. It cannot inspect deployments, logs, cloud accounts, Kubernetes clusters, Terraform state, or billing data. Do not enter passwords, API keys, secrets, or customer data.</p></div>

    {notice && <div role="status" className="flex items-center justify-between gap-3 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-3 text-sm text-accent-cyan"><span>{notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Dismiss message" className="rounded p-1 hover:bg-accent-cyan/10"><X size={14}/></button></div>}

    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orbitra-border px-4 py-4 sm:px-5"><div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple"><Bot size={19}/></span><div className="min-w-0"><h2 className="truncate text-sm font-semibold text-orbitra-text">{activeConversation.title}</h2><p className="mt-0.5 text-xs text-orbitra-muted">Local session · {activeConversation.messages.length} messages</p></div></div><Button variant="secondary" size="sm" onClick={newConversation}><Plus size={15}/>New chat</Button></div>

        <div className="min-h-[24rem] max-h-[60vh] space-y-4 overflow-y-auto p-4 sm:p-5" role="log" aria-label="Assistant conversation" aria-live="polite">
          {activeConversation.messages.length === 0 ? <div className="flex min-h-80 flex-col items-center justify-center text-center"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-purple/10 text-accent-purple"><MessageSquareText size={22}/></span><h3 className="mt-4 text-base font-semibold text-orbitra-text">What are you working through?</h3><p className="mt-2 max-w-md text-sm leading-6 text-orbitra-muted">Ask a DevOps question or choose a suggested prompt. Replies are static examples, not the result of inspecting your systems.</p><div className="mt-4 flex flex-wrap justify-center gap-2">{AI_SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => <button key={prompt.id} type="button" onClick={() => sendMessage(prompt.text)} className="rounded-full border border-orbitra-border bg-orbitra-900 px-3 py-2 text-xs text-orbitra-muted transition hover:border-accent-purple/40 hover:text-orbitra-text">{prompt.category}</button>)}</div></div> : activeConversation.messages.map((message) => <Message key={message.id} message={message}/>) }
          {isPending && <div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple"><Bot size={16}/></span><div className="rounded-xl border border-orbitra-border bg-orbitra-900/70 px-4 py-3"><div className="flex items-center gap-2 text-sm text-orbitra-muted"><span className="flex gap-1" aria-hidden="true"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-purple"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-purple [animation-delay:120ms]"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-purple [animation-delay:240ms]"/></span>Preparing a mock response…</div></div></div>}
          <div ref={bottomRef}/>
        </div>

        {errors[activeConversation.id] && <div role="alert" className="mx-4 mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-300 sm:mx-5"><span>{errors[activeConversation.id]}</span><Button size="sm" variant="secondary" onClick={() => lastPrompt && requestReply(activeConversation.id, lastPrompt)}>Retry</Button></div>}
        <form onSubmit={handleSubmit} className="border-t border-orbitra-border bg-orbitra-900/35 p-4 sm:p-5"><label htmlFor="assistant-message" className="sr-only">Message the mock DevOps assistant</label><div className="flex items-end gap-2 rounded-xl border border-orbitra-border bg-orbitra-900 p-2 focus-within:border-accent-purple/60 focus-within:ring-2 focus-within:ring-accent-purple/20"><textarea id="assistant-message" rows="2" maxLength={2000} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleInputKeyDown} placeholder="Ask a DevOps question… (Enter to send, Shift + Enter for a new line)" disabled={isPending} className="max-h-40 min-h-12 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-orbitra-text outline-none placeholder:text-orbitra-muted/70 disabled:opacity-60"/><Button type="submit" disabled={!draft.trim() || isPending} aria-label="Send message"><Send size={16}/><span className="hidden sm:inline">Send</span></Button></div><div className="mt-2 flex justify-between gap-3 text-[11px] text-orbitra-muted"><span>Do not include secrets or personal data.</span><span>{draft.length}/2000</span></div></form>
      </Card>

      <aside className="space-y-5">
        <Card title="Suggested prompts" description="Select a topic to start a demo response."><div className="space-y-2">{AI_SUGGESTED_PROMPTS.map((prompt) => { const Icon = promptIcons[prompt.icon] || Lightbulb; return <button key={prompt.id} type="button" onClick={() => sendMessage(prompt.text)} disabled={isPending} className="group flex w-full items-start gap-3 rounded-xl border border-orbitra-border bg-orbitra-900/50 p-3 text-left transition hover:border-accent-purple/30 hover:bg-orbitra-900 disabled:opacity-50"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orbitra-800 text-accent-purple"><Icon size={15}/></span><span className="min-w-0"><span className="block text-[11px] font-medium uppercase tracking-wide text-accent-purple">{prompt.category}</span><span className="mt-1 block text-xs leading-5 text-orbitra-muted group-hover:text-orbitra-text">{prompt.text}</span></span></button> })}</div></Card>

        <Card title="Session history" description="Conversations stay in memory until you leave or refresh this page."><div className="mb-3 flex items-center justify-between gap-2 text-xs text-orbitra-muted"><span>{conversations.filter((item) => item.messages.length).length} conversations · {messageCount} messages</span><button type="button" onClick={clearHistory} className="inline-flex items-center gap-1 rounded px-2 py-1 text-orbitra-muted transition hover:bg-orbitra-800 hover:text-red-300" aria-label="Clear session history"><Trash2 size={13}/>Clear</button></div><div className="max-h-64 space-y-2 overflow-y-auto">{conversations.filter((item) => item.messages.length > 0 || item.id === activeId).map((conversation) => <button key={conversation.id} type="button" onClick={() => { setActiveId(conversation.id); setNotice('') }} className={`w-full rounded-lg border px-3 py-3 text-left transition ${conversation.id === activeId ? 'border-accent-purple/40 bg-accent-purple/5' : 'border-orbitra-border bg-orbitra-900/40 hover:bg-orbitra-900'}`}><span className="flex items-start gap-2"><MessageSquareText size={14} className="mt-0.5 shrink-0 text-accent-purple"/><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-orbitra-text">{conversation.title}</span><span className="mt-1 flex items-center gap-1 text-[11px] text-orbitra-muted"><Clock3 size={11}/>{conversation.messages.length} messages</span></span>{conversation.id === activeId && <Check size={14} className="text-accent-purple"/>}</span></button>)}</div></Card>

        <div className="rounded-xl border border-orbitra-border bg-orbitra-850 p-4"><div className="flex items-center gap-2 text-sm font-medium text-orbitra-text"><ShieldAlert size={15} className="text-accent-orange"/>Safe demo boundary</div><p className="mt-2 text-xs leading-5 text-orbitra-muted">Replies are generated by local keyword matching. A future AI provider should be called through a secure backend; never place model API keys in this frontend.</p><p className="mt-3 text-[11px] text-orbitra-muted">To preview the error and retry UI, include <code className="rounded bg-orbitra-900 px-1.5 py-0.5 text-orbitra-text">[demo-error]</code> in your prompt.</p></div>
      </aside>
    </div>
  </div>
}

function Message({ message }) {
  const isUser = message.role === 'user'
  return <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isUser ? 'bg-accent-blue/15 text-accent-blue' : 'bg-accent-purple/10 text-accent-purple'}`}>{isUser ? <span className="text-xs font-semibold">You</span> : <Bot size={16}/>}</span><article className={`max-w-[88%] rounded-xl border px-4 py-3 ${isUser ? 'border-accent-blue/20 bg-accent-blue/5' : 'border-orbitra-border bg-orbitra-900/70'}`}><div className="mb-2 flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-orbitra-text">{isUser ? 'You' : 'Orbitra demo assistant'}</span>{message.topic && <Badge tone="purple" className="px-2 py-0.5 text-[10px]">{message.topic}</Badge>}<time className="text-[10px] text-orbitra-muted">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time></div><p className="whitespace-pre-wrap text-sm leading-6 text-orbitra-muted">{message.content}</p>{message.mock && <p className="mt-3 border-t border-orbitra-border pt-2 text-[10px] text-orbitra-muted">Mock response · no infrastructure analyzed</p>}</article></div>
}

export default AiAssistantPage
