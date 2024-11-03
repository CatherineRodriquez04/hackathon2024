/** @format */

import { Roboto } from "next/font/google";
import "./globals.css";

//components
import Footer from "../components/footer";
import Header from "@/components/Header";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Beyond Boundaries",
  description: "Hackathon 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col flex-grow ${roboto.variable}`}>
        <Header />
        <div className="container">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
