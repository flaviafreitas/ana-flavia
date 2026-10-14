import Link from 'next/link'
import styles from './Header.module.scss'

const links = [
  {href: '/', label: 'Início'},
  {href: '/blog', label: 'Blog'},
]

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.logo} href="/">Ana Flavia</Link>
        <nav aria-label="Navegação principal">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  )
}
