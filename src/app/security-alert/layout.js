import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function SecurityLayout({ children }) {
  return (
    
    <html lang="en">
    <head>
     <meta charSet="utf-8" />  
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     </head>
       <body>
         <Suspense fallback={<Loading />}>
           <main>{children}</main>
         </Suspense>
       </body>
     </html>
  );
}