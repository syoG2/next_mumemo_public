import layoutStyles from '@/components/layout/layout.module.css'
import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'

export default function Header() {
    return (
        <header className={layoutStyles.header}>
            <Link className={styles.logo} href="/">
                <div className={styles.logoImg}>
                    <Image src="/mu.svg" alt="logo" fill />
                </div>
                <div className={styles.logoText}>mumemo</div>
            </Link>
        </header>
    )
}