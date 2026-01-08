import type { Metadata } from "next";
import { NotoSansThai, geistSans, geistMono } from "@/constants/font";
import "@/ui/css/globals.css";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "@/actions/NotificationContext";
import Header from "@/ui/layout/user/header";
import Footer from "@/ui/layout/user/footer";

export const metadata: Metadata = {
  title: "Smart Store System",
  description:
    "ระบบยืมคืนอุปกรณ์สำหรับ นักศึกษา และบุคลากร คณะเทคนิคการแพทย์ มหาวิทยาลัยเชียงใหม่",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NotoSansThai.className} antialiased`}>
        <NextTopLoader
          color="#0055CA"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
          shadow="0 0 10px #0055CA,0 0 5px #0055CA"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <SessionProvider>
          <NotificationProvider>
            <Header />
            {children}
            <Footer />
          </NotificationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
