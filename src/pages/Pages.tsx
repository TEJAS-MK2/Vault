import type { ReactNode } from 'react'
import SignalField from '../components/SignalField'
import { GitHubTimeline } from '../components/GitHubTimeline'

function PageIntro({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <header className="page-intro">
    <p className="eyebrow"><span>{index}</span> / {eyebrow}</p>
    <h1>{title}</h1>
    {children && <div className="page-lede">{children}</div>}
  </header>
}

const interests = [
  { number: '01', title: 'Systems thinking', copy: 'Understanding what happens beneath the interface — architecture, logic, data and the decisions that make software dependable.', tag: 'UNDER THE HOOD', mark: '⌘' },
  { number: '02', title: 'Creative web', copy: 'Building expressive digital experiences where interaction, motion and visual clarity work together.', tag: 'ON THE SCREEN', mark: '✳' },
  { number: '03', title: 'Networks & security', copy: 'Exploring how devices connect, how infrastructure behaves and how to make the internet a little less mysterious.', tag: 'CONNECTED WORLD', mark: '⌁' },
]

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return <div className="home-page creator-home">
    <section className="creator-hero">
      <SignalField />
      <div className="creator-hero-top">
        <span className="creator-eyebrow"><i /> A PERSONAL SPACE ON THE INTERNET</span>
        <span className="creator-edition">INDEPENDENT / EST. 2026</span>
      </div>
      <div className="creator-hero-main">
        <div className="creator-hero-copy">
          <p className="creator-kicker">HEY, I'M PIJUSH <span>— STUDENT DEVELOPER</span></p>
          <h1>Curiosity<br />looks good<br /><em>in motion.</em></h1>
          <p className="creator-intro">I learn by building, breaking things, asking better questions and turning ideas into experiences people can actually use.</p>
          <div className="creator-actions">
            <button className="creator-button creator-button-primary" onClick={() => navigate('/about')}>Get to know me <span>↗</span></button>
            <button className="creator-button creator-button-quiet" onClick={() => navigate('/experiments')}>Explore my interests <span>↓</span></button>
          </div>
        </div>
        <div className="creator-visual" aria-label="Abstract animated network illustration">
          <div className="creator-visual-grid" />
          <div className="creator-visual-glow" />
          <div className="creator-orbit creator-orbit-a" />
          <div className="creator-orbit creator-orbit-b" />
          <div className="creator-orbit creator-orbit-c" />
          <div className="creator-visual-core"><span>P.</span></div>
          <span className="creator-node creator-node-a">IDEA</span>
          <span className="creator-node creator-node-b">BUILD</span>
          <span className="creator-node creator-node-c">REPEAT</span>
          <span className="creator-visual-caption">A MIND IN CONSTANT MOTION / 22.57° N</span>
        </div>
      </div>
      <div className="creator-hero-bottom"><span>SCROLL TO EXPLORE <b>↓</b></span><span>MADE OF QUESTIONS, MOSTLY.</span></div>
    </section>

    <section className="creator-intro-strip">
      <p>NOT HERE TO LOOK BUSY.</p>
      <h2>Here to stay <em>curious.</em></h2>
      <span>Technology is the medium. Learning is the point.</span>
    </section>

    <section className="creator-interests section-block" id="interests">
      <div className="creator-section-heading">
        <div><p className="eyebrow">01 / WHAT I'M INTO</p><h2>A few rabbit<br /><em>holes I love.</em></h2></div>
        <p>Three directions I keep coming back to. Different disciplines, one shared instinct: understand how things work, then see what else they can do.</p>
      </div>
      <div className="creator-interest-grid">
        {interests.map((item) => <article className="creator-interest-card" key={item.number}>
          <div className="creator-card-top"><span>{item.number} / FIELD</span><span className="creator-card-mark" aria-hidden="true">{item.mark}</span></div>
          <div><p className="creator-card-tag">{item.tag}</p><h3>{item.title}</h3><p className="creator-card-copy">{item.copy}</p></div>
          <span className="creator-card-arrow" aria-hidden="true">↗</span>
        </article>)}
      </div>
    </section>

    <GitHubTimeline />

    <section className="creator-about-band">
      <div className="creator-about-label"><span>03 / THE PERSON</span><span>BEHIND THE KEYBOARD</span></div>
      <div className="creator-about-content">
        <h2>Part engineer.<br />Part explorer.<br /><em>Always a student.</em></h2>
        <div><p>I’m Pijush. I’m interested in the space between how technology works and how it feels to use it. I like getting into the details, experimenting with ideas and learning something new along the way.</p><button className="creator-inline-link" onClick={() => navigate('/about')}>A little more about me <span>↗</span></button></div>
      </div>
    </section>

    <section className="creator-toolkit section-block">
      <div><p className="eyebrow">04 / THE TOOLBOX</p><h2>Tools change.<br /><em>Curiosity stays.</em></h2></div>
      <div className="creator-toolkit-content"><p>My current toolkit moves across the web stack, scripting and app development. The fun part is learning which tool makes the most sense for the problem.</p><div className="creator-tool-tags"><span>JAVASCRIPT</span><span>TYPESCRIPT</span><span>REACT</span><span>NODE.JS</span><span>PYTHON</span><span>FLUTTER</span><span>GIT</span><span>LINUX</span></div><button className="creator-inline-link" onClick={() => navigate('/uses')}>See my setup <span>↗</span></button></div>
    </section>

    <section className="creator-contact">
      <div className="creator-contact-orbit" aria-hidden="true"><span>✳</span></div>
      <p className="eyebrow">05 / YOUR TURN</p>
      <h2>Got a curious<br /><em>mind too?</em></h2>
      <p>Good conversations can lead to unexpected places. If you want to talk tech, share an idea or just say hello, my inbox is open.</p>
      <button className="creator-button creator-button-primary" onClick={() => navigate('/contact')}>Let's talk <span>↗</span></button>
    </section>
  </div>
}

export function AboutPage() {
  return <div className="content-page"><PageIntro index="01" eyebrow="ABOUT" title={<>A person behind<br /><em>the pixels.</em></>}><p>I’m Pijush, a developer who learns by building. I’m interested in the way software works beneath the surface and how people experience it on the screen.</p></PageIntro><section className="prose-block"><h2>What keeps me curious</h2><p>Developer tools, networks, browser interfaces, practical automation and the small details that make a product feel considered. I enjoy moving between the structure of a system and the character of its interface.</p><h2>How I like to build</h2><p>Start with a real problem. Understand the constraints. Make the smallest useful thing, then keep refining it. I value clear behavior, resilient data handling and interfaces that respect the person using them.</p></section></div>
}

export function ExperimentsPage() {
  return <div className="content-page"><PageIntro index="03" eyebrow="INTERESTS" title={<>Ideas in<br /><em>motion.</em></>}><p>A place for the subjects, questions and rabbit holes that keep me exploring.</p></PageIntro><section className="prose-block"><h2>What I keep exploring</h2><p>Systems and infrastructure, creative web interfaces, networks, security and the craft of making software feel clear. This space will grow as I find useful things to share.</p></section></div>
}

export function WritingPage() {
  return <div className="content-page"><PageIntro index="04" eyebrow="NOTES" title={<>Notes from<br /><em>the process.</em></>}><p>Technical notes, observations and ideas worth keeping. Articles will appear here when they are ready to read.</p></PageIntro><section className="prose-block"><h2>Coming into focus</h2><p>I’m collecting useful lessons from the things I learn and build. This space will hold the details that do not fit anywhere else.</p></section></div>
}

export function UsesPage() {
  return <div className="content-page"><PageIntro index="05" eyebrow="USES" title={<>Tools of<br /><em>the trade.</em></>}><p>A practical inventory of the tools and setup behind the work.</p></PageIntro><section className="prose-block"><h2>Current toolkit</h2><p>VS Code, Git, GitHub, JavaScript, TypeScript, React, Vite, Node.js, Python and Flutter are part of my current toolkit. This list will be refined into a current setup rather than a permanent shopping list.</p></section></div>
}

export function NowPage() {
  return <div className="content-page"><PageIntro index="06" eyebrow="NOW" title={<>What I’m<br /><em>focused on.</em></>}><p>A small snapshot of current interests and active work.</p></PageIntro><section className="prose-block"><h2>Current direction</h2><p>Building useful developer experiences, exploring expressive web interfaces and improving the craft behind reliable applications.</p></section></div>
}

export function ContactPage() {
  return <div className="content-page"><PageIntro index="07" eyebrow="CONTACT" title={<>Have a good<br /><em>question?</em></>}><p>For a thoughtful exchange, collaboration or just to say hello, the best verified public starting point is GitHub.</p></PageIntro><div className="project-actions"><a className="text-link" href="https://github.com/TEJAS-MK2" target="_blank" rel="noreferrer">Find me on GitHub ↗</a></div></div>
}

export function NotFoundPage() {
  return <div className="content-page not-found"><p className="eyebrow">404 / NOT FOUND</p><h1>This path<br /><em>goes nowhere.</em></h1><a className="text-link" href="/">Return to the beginning ↗</a></div>
}
