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
                <div className={layoutStyles.rside}>
                    <div className={layoutStyles.rsideSticky}>
                        {rside}
                    </div>
                </div>
            </>
        )
    }
}