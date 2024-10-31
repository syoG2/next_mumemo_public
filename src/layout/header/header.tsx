import layoutStyles from '@/layout/layout.module.css'
import Link from 'next/link'
import styles from './header.module.css'

export default function Header() {
    return (
        <header className={layoutStyles.header}>
            <Link className={styles.logo} href="/">
                <img className={styles.logoImg} src="/mu.svg" alt="logo" />
                <div className={styles.logoText}>mumemo</div>
            </Link>
        </header>
    )
}