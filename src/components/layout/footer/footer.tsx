import layoutStyles from '@/components/layout/layout.module.css'
import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={layoutStyles.footer}>
            <div>
                <Link className={styles.logo} href="/">
                    <div className={styles.logoImg}>
                        <Image src="/mu.svg" alt="logo" fill />
                    </div>
                    <div className={styles.logoText}>mumemo</div>
                </Link>
                <div className={styles.copyright}>&copy; 2024 syo </div>
            </div>
        </footer>
    )
}