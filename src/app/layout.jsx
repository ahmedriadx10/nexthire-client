import {  Inter,Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";



//optional font import for future use
// const poppins=Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700",'800','900'],
// });


const interFont=Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700",'800','900'],
})

export const metadata = {
  title: "NextHire",
  description: "NextHire is a platform that connects job seekers with potential employers, providing tools and resources to streamline the hiring process.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${interFont.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {children}
       <Toaster />  
        </body>
    </html>
  );
}
