import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">© {new Date().getFullYear()} Ana Flavia</div>
    </footer>
  )
}
