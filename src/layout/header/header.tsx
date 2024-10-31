import layoutStyles from '@/layout/layout.module.css'

export default function Header() {
    return (
        <header className={layoutStyles.header}>
            <div>header</div>
            {/* <Link className={styles.logo} href="/">
                <img className={styles.logoImg} src="/mu.svg" alt="logo" />
                <div className={styles.logoText}>mumemo</div>
            </Link> */}
        </header>
    )
}