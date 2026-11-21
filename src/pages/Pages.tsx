import type { ReactNode } from 'react'
import { getProject, projects } from '../data/projects'
import SignalField from '../components/SignalField'

function PageIntro({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <header className="page-intro">
    <p className="eyebrow"><span>{index}</span> / {eyebrow}</p>
    <h1>{title}</h1>
    {children && <div className="page-lede">{children}</div>}
  </header>
}

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return <div className="home-page">
    <section className="home-hero">\n      <SignalField />
      <div className="hero-index"><span>INDEPENDENT DEVELOPER</span><span>INDIA · ONLINE</span></div>
      <p className="hero-kicker">A DIGITAL SPACE FOR THINGS I BUILD.</p>
      <h1>Curious by nature.<br /><em>Built to explore.</em></h1>
      <div className="hero-bottom">
        <p>I’m Pijush — a developer exploring the edges between software, interfaces and ideas. This is where the work lives.</p>
        <button className="text-link" onClick={() => navigate('/projects')}>Explore selected work <span>↗</span></button>
      </div>
      <div className="hero-coordinate" aria-hidden="true"><span>22°34′ N</span><span>88°22′ E</span><span>FIG. 001 — SIGNAL / FIELD</span></div>
    </section>

    <section className="selected-work section-block">
      <div className="section-heading"><p className="eyebrow">01 / SELECTED WORK</p><button className="text-link" onClick={() => navigate('/projects')}>All projects ↗</button></div>
      <div className="project-index">
        {projects.filter((project) => project.featured).map((project, index) => (
          <button className="project-row" key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}>
            <span className="project-number">0{index + 1}</span>
            <span className="project-title">{project.title}<small>{project.category}</small></span>
            <span className="project-summary">{project.summary}</span>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>

    <section className="about-teaser section-block">
      <p className="eyebrow">02 / A LITTLE CONTEXT</p>
      <div><h2>Not just writing code.<br /><em>Making things make sense.</em></h2><p>I like building tools that feel thoughtful, interfaces that invite exploration, and systems that solve real problems. The process is as interesting as the result.</p><button className="text-link" onClick={() => navigate('/about')}>A little more about me ↗</button></div>
    </section>
  </div>
}

export function AboutPage() {
  return <div className="content-page"><PageIntro index="01" eyebrow="ABOUT" title={<>A person behind<br /><em>the pixels.</em></>}><p>I’m Pijush, a developer who learns by building. I’m interested in the way software works beneath the surface and how people experience it on the screen.</p></PageIntro><section className="prose-block"><h2>What keeps me curious</h2><p>Developer tools, maps, browser interfaces, practical automation and the small details that make a product feel considered. I enjoy moving between the structure of a system and the character of its interface.</p><h2>How I like to build</h2><p>Start with a real problem. Understand the constraints. Make the smallest useful thing, then keep refining it. I value clear behavior, resilient data handling and interfaces that respect the person using them.</p></section></div>
}

export function ProjectsPage({ navigate }: { navigate: (path: string) => void }) {
  return <div className="content-page"><PageIntro index="02" eyebrow="PROJECT INDEX" title={<>Selected things<br /><em>made real.</em></>}><p>A growing archive of tools, interfaces and experiments. Each entry links to its source and, where available, a live build.</p></PageIntro><div className="project-index project-index-page">{projects.map((project, index) => <button className="project-row" key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}><span className="project-number">0{index + 1}</span><span className="project-title">{project.title}<small>{project.category}</small></span><span className="project-summary">{project.summary}</span><span className="project-arrow">↗</span></button>)}</div></div>
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return <NotFoundPage />
  return <article className="content-page project-detail"><PageIntro index="PROJECT" eyebrow={project.category.toUpperCase()} title={<>{project.title}<em>.</em></>}><p>{project.summary}</p></PageIntro><div className="project-facts"><div><span>STATUS</span><strong>{project.status}</strong></div><div><span>YEAR</span><strong>{project.year}</strong></div><div><span>STACK</span><strong>{project.stack.join(' · ')}</strong></div></div><section className="prose-block"><h2>About the project</h2><p>{project.description}</p><h2>Tools & technologies</h2><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></section><div className="project-actions"><a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">View source ↗</a>{project.demoUrl && <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">Open live project ↗</a>}</div></article>
}

export function ExperimentsPage() {
  return <div className="content-page"><PageIntro index="03" eyebrow="EXPERIMENTS" title={<>Ideas in<br /><em>motion.</em></>}><p>A place for prototypes, sketches and things that are interesting before they are finished.</p></PageIntro><section className="prose-block"><h2>Work in progress</h2><p>This section will grow as experiments are documented. Only working, attributable experiments will be published here — no invented demos or placeholder projects.</p></section></div>
}

export function WritingPage() {
  return <div className="content-page"><PageIntro index="04" eyebrow="WRITING" title={<>Notes from<br /><em>the process.</em></>}><p>Technical notes, build logs and ideas worth keeping. Articles will appear here when they are ready to read.</p></PageIntro><section className="prose-block"><h2>Coming into focus</h2><p>I’m collecting useful lessons from the things I build. This space will hold the details that do not fit in a project summary.</p></section></div>
}

export function UsesPage() {
  return <div className="content-page"><PageIntro index="05" eyebrow="USES" title={<>Tools of<br /><em>the trade.</em></>}><p>A practical inventory of the tools and setup behind the work.</p></PageIntro><section className="prose-block"><h2>Current toolkit</h2><p>VS Code, Git, GitHub, JavaScript, TypeScript, React, Vite, Node.js, Python and Flutter appear across the projects in this portfolio. This list will be refined into a current setup rather than a permanent shopping list.</p></section></div>
}

export function NowPage() {
  return <div className="content-page"><PageIntro index="06" eyebrow="NOW" title={<>What I’m<br /><em>focused on.</em></>}><p>A small snapshot of current interests and active work.</p></PageIntro><section className="prose-block"><h2>Current direction</h2><p>Building useful developer experiences, exploring expressive web interfaces and improving the craft behind reliable applications.</p></section></div>
}

export function ContactPage() {
  return <div className="content-page"><PageIntro index="07" eyebrow="CONTACT" title={<>Have a good<br /><em>question?</em></>}><p>For project conversations, collaboration or a thoughtful exchange, the best verified public starting point is GitHub.</p></PageIntro><div className="project-actions"><a className="text-link" href="https://github.com/TEJAS-MK2" target="_blank" rel="noreferrer">Find me on GitHub ↗</a></div></div>
}

export function NotFoundPage() {
  return <div className="content-page not-found"><p className="eyebrow">404 / NOT FOUND</p><h1>This path<br /><em>goes nowhere.</em></h1><a className="text-link" href="/">Return to the beginning ↗</a></div>
}
