import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description: "A modern SEO-optimized blog built with Next.js",
  keywords: ["blog", "nextjs", "react", "web development"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
