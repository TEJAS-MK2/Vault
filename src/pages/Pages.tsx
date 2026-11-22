import type { ReactNode } from 'react'
import { getProject, projects } from '../data/projects'
import SignalField from '../components/SignalField'
import ProjectArtwork from '../components/ProjectArtwork'
import { getCaseStudy } from '../data/case-studies'

function PageIntro({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <header className="page-intro">
    <p className="eyebrow"><span>{index}</span> / {eyebrow}</p>
    <h1>{title}</h1>
    {children && <div className="page-lede">{children}</div>}
  </header>
}

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const featured = projects.filter((project) => project.featured)
  return <div className="home-page">
    <section className="home-hero">
      <SignalField />
      <div className="hero-index"><span>INDEPENDENT DEVELOPER</span><span>EST. IN CURIOSITY · INDIA</span></div>
      <div className="hero-main">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="status-dot" /> A DIGITAL SPACE FOR THINGS I BUILD</p>
          <h1>Curious<br />by <em>nature.</em></h1>
          <div className="hero-bottom">
            <p>I’m Pijush — a developer exploring the edges between software, interfaces and ideas. I turn questions into working things, then keep pulling at the details.</p>
            <button className="text-link" onClick={() => navigate('/projects')}>Explore the work <span>↗</span></button>
          </div>
        </div>
        <div className="hero-object" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="hero-core"><span>P.</span></div>
          <span className="orbit-label orbit-label-a">IDEAS → SYSTEMS</span>
          <span className="orbit-label orbit-label-b">BUILD / BREAK / REPEAT</span>
          <span className="orbit-coordinate">22°34′ N<br />88°22′ E</span>
        </div>
      </div>
      <div className="hero-coordinate"><span>SCROLL TO EXPLORE</span><span>FIG. 001 — A WORK IN PROGRESS</span><span>2026 / PRESENT</span></div>
    </section>

    <div className="ticker" aria-label="Areas of interest">
      <div className="ticker-track"><span>SOFTWARE</span><i>✳</i><span>INTERACTION</span><i>✳</i><span>EXPERIMENTS</span><i>✳</i><span>OPEN WEB</span><i>✳</i><span>SOFTWARE</span><i>✳</i><span>INTERACTION</span><i>✳</i><span>EXPERIMENTS</span><i>✳</i><span>OPEN WEB</span><i>✳</i></div>
    </div>

    <section className="selected-work section-block">
      <div className="section-heading"><p className="eyebrow">01 / SELECTED WORK</p><button className="text-link" onClick={() => navigate('/projects')}>Project index <span>↗</span></button></div>
      <div className="featured-grid">
        {featured.map((project, index) => (
          <button className={`featured-project featured-project-${index + 1}`} key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}>
            <div className="featured-art"><ProjectArtwork slug={project.slug} /><span className="art-index">PROJECT / 0{index + 1}</span><span className="art-source">{project.slug === "modern-calculator" ? "LIVE PROJECT CAPTURE" : "CONCEPT ILLUSTRATION"}</span><span className="art-arrow">↗</span></div>
            <div className="featured-meta"><div><h2>{project.title}</h2><p>{project.summary}</p></div><span>{project.category}</span></div>
          </button>
        ))}
      </div>
    </section>

    <section className="manifesto section-block">
      <p className="eyebrow">02 / THE APPROACH</p>
      <div className="manifesto-content"><h2>Make it work.<br /><em>Make it clear.</em><br />Make it matter.</h2><div className="manifesto-note"><span className="note-mark">↳</span><p>I’m interested in the space where engineering meets expression: tools that feel good to use, interfaces with a point of view, and systems that do what they promise.</p><button className="text-link" onClick={() => navigate('/about')}>A little about me <span>↗</span></button></div></div>
    </section>

    <section className="home-bottom section-block">
      <div><p className="eyebrow">03 / KEEP IN TOUCH</p><h2>Have a curious<br /><em>problem?</em></h2></div>
      <div className="home-bottom-action"><p>Good ideas usually start with a conversation. If something here caught your attention, come say hello.</p><button className="text-link" onClick={() => navigate('/contact')}>Start a conversation <span>↗</span></button></div>
    </section>
  </div>
}

export function AboutPage() {
  return <div className="content-page"><PageIntro index="01" eyebrow="ABOUT" title={<>A person behind<br /><em>the pixels.</em></>}><p>I’m Pijush, a developer who learns by building. I’m interested in the way software works beneath the surface and how people experience it on the screen.</p></PageIntro><section className="prose-block"><h2>What keeps me curious</h2><p>Developer tools, maps, browser interfaces, practical automation and the small details that make a product feel considered. I enjoy moving between the structure of a system and the character of its interface.</p><h2>How I like to build</h2><p>Start with a real problem. Understand the constraints. Make the smallest useful thing, then keep refining it. I value clear behavior, resilient data handling and interfaces that respect the person using them.</p></section></div>
}

export function ProjectsPage({ navigate }: { navigate: (path: string) => void }) {
  return <div className="content-page"><PageIntro index="02" eyebrow="PROJECT INDEX" title={<>Selected things<br /><em>made real.</em></>}><p>A growing archive of tools, interfaces and experiments. Each entry links to its source and, where available, a live build.</p></PageIntro><div className="project-index project-index-page">{projects.map((project, index) => <button className="project-row" key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}><span className="project-number">0{index + 1}</span><span className="project-title">{project.title}<small>{project.category}</small></span><span className="project-summary">{project.summary}</span><span className="project-arrow">↗</span></button>)}</div></div>
}


function CaseStudyContent({ slug }: { slug: string }) {
  const study = getCaseStudy(slug)
  if (!study) return null
  return <div className="case-study">
    <div className="case-study-heading"><p className="eyebrow">FIELD NOTES / 0{slug === 'code-forge' ? '1' : slug === 'atlas' ? '2' : slug === 'pijush-os' ? '3' : '4'}</p><h2>Inside the <em>build.</em></h2><p className="case-study-note">A closer look at the problem, implementation and trade-offs documented for this project.</p></div>
    <section className="case-study-intro"><span>THE CONTEXT</span><p>{study.context}</p></section>
    <section className="case-study-intro case-study-approach"><span>THE APPROACH</span><p>{study.approach}</p></section>
    <div className="case-study-sections">{study.sections.map((section, index) => <section className="case-study-section" key={section.title}><span>0{index + 1}</span><div><h3>{section.title}</h3><p>{section.body}</p>{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div></section>)}</div>
    <section className="case-study-constraints"><span>CONSTRAINTS & HONEST LIMITS</span><ul>{study.constraints.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <p className="case-study-footnote">{study.note}</p>
  </div>
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const project = getProject(slug)
  if (!project) return <NotFoundPage />
  return <article className="content-page project-detail"><PageIntro index="PROJECT" eyebrow={project.category.toUpperCase()} title={<>{project.title}<em>.</em></>}><p>{project.summary}</p></PageIntro><figure className="detail-art"><ProjectArtwork slug={project.slug} /><figcaption>{project.slug === "modern-calculator" ? "Interface screenshot from the project repository." : "Original portfolio illustration — not a screenshot of the live application."}</figcaption></figure><div className="project-facts"><div><span>STATUS</span><strong>{project.status}</strong></div><div><span>YEAR</span><strong>{project.year}</strong></div><div><span>STACK</span><strong>{project.stack.join(' · ')}</strong></div></div><section className="prose-block"><h2>About the project</h2><p>{project.description}</p><h2>Tools & technologies</h2><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></section><CaseStudyContent slug={project.slug} /><div className="project-actions"><a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">View source ↗</a>{project.demoUrl && <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">Open live project ↗</a>}</div></article>
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
