import { Fira_Code } from "next/font/google";
import "./globals.css";
import Nav from "@/sections/Nav";
import Footer from "@/sections/Footer";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Satyam Dwivedi",
  description: "A programmer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fira_code.className} bg-theme font-medium text-white`}
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundSize: "100%",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
        }}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
