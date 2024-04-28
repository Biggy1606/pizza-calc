import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "./top-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wise Slice",
  description: "Le pizza calculator 🍕🤌, get prices by slice and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <TopBar />
        <div className='flex w-full flex-col items-center space-y-4 px-4 py-8 '>
          {children}
        </div>
      </body>
    </html>
  );
}
