import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from "@/components/Provider"
export const metadata = {
    title: 'Learn Next',
    description: 'Generated by create next app',
}
export const runtime = 'nodejs';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </head>
            <body suppressHydrationWarning={true}>
                <main>
                    <Provider>
                        {children}
                    </Provider>
                </main>
            </body>
        </html>
    )
}
