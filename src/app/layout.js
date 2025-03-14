import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import ProgressBar from '@/components/ui/ProgressBar';
import '@/styles/globals.css';
import '@/styles/animations.css';

// Load Inter font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'GameGuides | Expert Video Game Walkthroughs',
  description: 'Comprehensive video game walkthroughs to help you master your favorite games with expert tips and strategies.',
  keywords: 'video games, walkthroughs, guides, gaming, tips, strategies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ProgressBar />
        <Header />
        
        <div id="main-content" className="main-content visible">
          {children}
        </div>
        
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}