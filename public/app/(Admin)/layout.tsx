import Header from "@/ui/layout/admin/header";
import Footer from "@/ui/layout/admin/footer";
import "@/ui/css/globals.css";
import SideBar from "@/ui/layout/admin/sidebar";
import { Suspense } from "react";
import { metadata as metaConstants } from "@/constants/meta";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NotoSansThai } from "@/constants/font";

export const metadata: Metadata = {
  title: metaConstants.title,
  description: metaConstants.description,
  icons: {
    icon: metaConstants.icons.icon,
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
        <div className="flex flex-row">
          <Suspense>
            <SideBar />
            <div className="w-full">
              <Header />
              {children}
            </div>
          </Suspense>
        </div>
        <Footer />
      </body>
    </html>
  );
}
