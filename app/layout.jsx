import { Roboto } from "next/font/google";
import { Source_Sans_Pro } from '@next/font/google';
import "./globals.css";

//components
import Footer from "../components/footer";
import Header from "@/components/Header";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-roboto', 
});

const sourceSans = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans', 
});

export const metadata = {
  title: "Beyond Boundaries",
  description: "Hackathon 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${sourceSans.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
