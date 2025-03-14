import { Inter } from 'next/font/google';
import '../styles/main.css';

// Load Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'GameGuides | Expert Video Game Walkthroughs',
  description: 'Comprehensive video game walkthroughs to help you master your favorite games with expert tips and strategies.',
  keywords: 'video games, walkthroughs, guides, gaming, tips, strategies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}