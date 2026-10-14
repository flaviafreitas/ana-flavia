import {PortableText} from '@portabletext/react'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/client'
import {HOME_QUERY} from '@/sanity/lib/queries'
import styles from './page.module.scss'

type HomeData = {eyebrow?: string; title?: string; introduction?: string; body?: never[]}

export default async function Home() {
  const home = await sanityFetch<HomeData | null>(HOME_QUERY)

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>{home?.eyebrow ?? 'Bem-vindo'}</span>
          <h1>{home?.title ?? 'Um espaço para apresentar seu trabalho e suas ideias.'}</h1>
          <p>{home?.introduction ?? 'Esta página inicial está pronta para evoluir com o conteúdo gerenciado pelo Sanity.'}</p>
          <Link className="button" href="/blog">Ver publicações</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Sobre</h2>
          <div className={`prose ${styles.intro}`}>
            {home?.body ? <PortableText value={home.body} /> : <p>Use esta área para apresentar sua trajetória e seu trabalho.</p>}
          </div>
        </div>
      </section>
    </>
  )
}
