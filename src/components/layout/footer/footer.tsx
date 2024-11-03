import layoutStyles from '@/components/layout/layout.module.css'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={layoutStyles.footer}>
            <div>
                <Link className={styles.logo} href="/">
                    <img className={styles.logoImg} src="/mu.svg" alt="logo" />
                    <div className={styles.logoText}>mumemo</div>
                </Link>
                <small className={styles.copyright}>&copy; 2024 syo </small>
            </div>
        </footer>
    )
}