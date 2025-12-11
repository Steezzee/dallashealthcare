import '../globals.css';
import Header from '../_components/Header/Header';
import Footer from '../_components/Footer/Footer';
import TabBar from '../_components/TabBar/TabBar';



export const metadata = {
  title: 'Dallas Healthcare',
  description: 'Find quality healthcare in Dallas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-wrapper">
          <Header />
          <TabBar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};
