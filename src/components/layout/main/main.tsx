import layoutStyles from '@/components/layout/layout.module.css'
export default function Main({ children, rside = null }: { children: React.ReactNode, rside?: React.ReactNode }) {
    if (rside === null) {
        return (
            <main className={layoutStyles.onlyMain}>
                {children}
            </main>
        )
    } else {
        return (
            <>
                <main className={layoutStyles.main}>
                    {children}
                </main>
                <nav className={layoutStyles.rside}>
                    <details className={layoutStyles.rsideSticky}>
                        <summary className={layoutStyles.summary}>
                            <span className={layoutStyles.triangle}>▼</span>
                            <h3>目次</h3>
                        </summary>
                        <hr />
                        {rside}
                    </details>
                </nav>
            </>
        )
    }
}