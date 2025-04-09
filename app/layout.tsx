import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import Sidebar from "@/components/navigation/sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Order Tracker",
  description: "An assignment by Aviroop Jana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} h-screen overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar />
          <main className="flex h-full">
            <div className="h-full overflow-hidden">
              <Sidebar />
            </div>
            <section className="flex-1 overflow-auto pb-20">
              {children}
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}