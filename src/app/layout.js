import Loading from "@/components/Loading";
import { Suspense } from "react";
import "./globals.css"


export default async function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Suspense fallback={<Loading />}>
            <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
