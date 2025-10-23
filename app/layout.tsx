import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'; // Your global styles here
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';
import TabBar from './_components/TabBar/TabBar';


export const metadata = {
  title: 'Dallas Healthcare',
  description: 'Find quality healthcare in Dallas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style = {{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header />
        <TabBar />
          {children}
        
          <Footer />
      </body>
    </html>
  );
}
