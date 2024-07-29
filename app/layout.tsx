import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './fontawesome'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: 'Serverless Registry',
    description: 'Serverless 包管理平台',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
