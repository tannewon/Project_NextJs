// RootLayout.js
import Navbar from "@/component/Navbar";
import { Inter } from "next/font/google";
import "../styles/global.css";
import Footer from "@/component/Footer";
import { ThemeProvider } from "@/component/ThemeProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Page | Nine Dev",
  description: "Day la trang web day hoc truc tuyen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
