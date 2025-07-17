'use client'

import Link from 'next/link'
import '../globals.css'
import Recomended from '@/components/Recomended/Recomended'

interface ContentViewerProps {
  title: string
  media: string
  measurements: string[]
  method: string
}

export default function ContentViewer({
  title,
  media,
  measurements,
  method,
}: ContentViewerProps) {
  return (
    <>
      <header>
        <div className="contentTopic">
          <nav className="breadcrumb">
            <Link href="/">Home</Link> •{' '}
            <Link href="/blogs">Blogs</Link> •{' '}
            <span className="active">{title}</span>
          </nav>
          <h1>{title}</h1>
        </div>
      </header>

      <main>
        <section className="mediaFrame">
          <iframe
            src={media}
            title={title}
            width="100%"
            height="400"
            allowFullScreen
          ></iframe>
        </section>

        <section className="measurement">
          <h2>Measurements</h2>
          <ul>
            {measurements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="method">
          <h2>Method of Preparation</h2>
          <p>{method}</p>
        </section>

        <Recomended />
      </main>
    </>
  )
}
