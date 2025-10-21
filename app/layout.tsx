import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'; // Your global styles here
import NavigationBar from './_components/NavigationBar';

export const metadata = {
  title: 'Dallas Healthcare',
  description: 'Find quality healthcare in Dallas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavigationBar />
        </header>
        <main style={{ padding: '20px' }}>
          {children}
        </main>
        <footer style={{ backgroundColor: '#004080', color: 'white', textAlign: 'center', padding: '12px' }}>
          &copy; 2025 Dallas Healthcare
        </footer>
      </body>
    </html>
  );
}
