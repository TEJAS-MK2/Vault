import { useEffect, useState } from 'react'

type GitHubEvent = {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload: {
    action?: string
    ref_type?: string
    ref?: string
    commits?: Array<{ sha: string; message: string }>
    pull_request?: { title?: string; html_url?: string }
    issue?: { title?: string; html_url?: string }
    release?: { name?: string; tag_name?: string; html_url?: string }
  }
}

function describe(event: GitHubEvent) {
  const payload = event.payload
  switch (event.type) {
    case 'PushEvent': return { title: payload.commits?.[0]?.message?.split('\n')[0] || 'Pushed code', detail: payload.commits?.length ? `${payload.commits.length} commit${payload.commits.length === 1 ? '' : 's'}` : 'Code update' }
    case 'PullRequestEvent': return { title: payload.pull_request?.title || 'Pull request activity', detail: payload.action ? `Pull request ${payload.action}` : 'Pull request' }
    case 'IssuesEvent': return { title: payload.issue?.title || 'Issue activity', detail: payload.action ? `Issue ${payload.action}` : 'Issue' }
    case 'CreateEvent': return { title: `Created ${payload.ref_type || 'repository item'}`, detail: payload.ref || event.repo.name }
    case 'ReleaseEvent': return { title: payload.release?.name || 'Published a release', detail: payload.release?.tag_name || 'Release' }
    case 'WatchEvent': return { title: 'Starred a repository', detail: 'Community signal' }
    case 'ForkEvent': return { title: 'Forked a repository', detail: 'Open-source exploration' }
    default: return null
  }
}

function eventUrl(event: GitHubEvent) {
  const repo = `https://github.com/${event.repo.name}`
  if (event.type === 'PushEvent' && event.payload.commits?.[0]?.sha) return `${repo}/commit/${event.payload.commits[0].sha}`
  if (event.type === 'PullRequestEvent' && event.payload.pull_request?.html_url) return event.payload.pull_request.html_url
  if (event.type === 'IssuesEvent' && event.payload.issue?.html_url) return event.payload.issue.html_url
  if (event.type === 'ReleaseEvent' && event.payload.release?.html_url) return event.payload.release.html_url
  return repo
}

export function GitHubTimeline() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading')

  useEffect(() => {
    let active = true
    const cached = sessionStorage.getItem('pijush-public-events')
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as GitHubEvent[]
        if (Array.isArray(parsed)) { setEvents(parsed); setStatus(parsed.length ? 'ready' : 'empty') }
      } catch { sessionStorage.removeItem('pijush-public-events') }
    }
    fetch('https://api.github.com/users/TEJAS-MK2/events/public?per_page=30', { headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
        return response.json() as Promise<GitHubEvent[]>
      })
      .then((data) => {
        if (!active) return
        const visible = data.filter((event) => describe(event)).slice(0, 6)
        sessionStorage.setItem('pijush-public-events', JSON.stringify(visible))
        setEvents(visible)
        setStatus(visible.length ? 'ready' : 'empty')
      })
      .catch(() => { if (active && !cached) setStatus('error') })
    return () => { active = false }
  }, [])

  return <section className="github-timeline section-block" aria-labelledby="timeline-title">
    <div className="timeline-heading">
      <div><p className="eyebrow">02 / THE OPEN TRAIL</p><h2 id="timeline-title">A little proof<br /><em>of curiosity.</em></h2></div>
      <div className="timeline-source"><span className="timeline-live-dot" /> PUBLIC GITHUB ACTIVITY <a href="https://github.com/TEJAS-MK2" target="_blank" rel="noreferrer">VIEW PROFILE ↗</a></div>
    </div>
    {status === 'loading' && <p className="timeline-message">Loading recent public activity…</p>}
    {status === 'error' && <p className="timeline-message">Public activity is temporarily unavailable. The rest of the site is unaffected.</p>}
    {status === 'empty' && <p className="timeline-message">No recent public events to show. Check back as new activity appears.</p>}
    {events.length > 0 && <ol className="timeline-list">{events.map((event) => {
      const item = describe(event)
      if (!item) return null
      return <li key={event.id}><span className="timeline-date">{new Date(event.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</span><span className="timeline-marker" aria-hidden="true" /><div className="timeline-event"><a href={eventUrl(event)} target="_blank" rel="noreferrer"><strong>{item.title}</strong><span>↗</span></a><p>{event.repo.name} <i>·</i> {item.detail}</p></div></li>
    })}</ol>}
    <p className="timeline-footnote">A live, limited view of public GitHub events. Private activity is not requested or displayed.</p>
  </section>
}
