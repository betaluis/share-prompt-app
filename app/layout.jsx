import "@styles/global.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "Prompt Share",
    description: "Discover and share ai prompts",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Provider>
                <body>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </body>
            </Provider>
        </html>
    )
}
