import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/lib/metadata";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interFont.className}  h-full antialiased`}>
      <body className="min-h-full  flex flex-col antialiased ">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
