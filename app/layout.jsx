import "@styles/global.css";

export const metadata = {
    title: "Prompt Share",
    description: "Discover and share ai prompts",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">{children}</main>
            </body>
        </html>
    )
}
