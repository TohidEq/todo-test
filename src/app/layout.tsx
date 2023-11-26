import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/tailwind.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Do",
  description: "Simple To-Do App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="App">{children}</div>
      </body>
    </html>
  );
}
