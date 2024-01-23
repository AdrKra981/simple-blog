import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import ReduxProvider from "./redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple blog ",
  description: "Simple blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <CookiesProvider>{children}</CookiesProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
