import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "My Blog",
    template: "%s | My Blog"
  },
  description: "A modern SEO-optimized blog built with Next.js",
  keywords: ["blog", "nextjs", "react", "web development"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main className="container min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}