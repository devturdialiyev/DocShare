import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocShare - National Digital Health Platform",
  description: "Uzbekistan's National Digital Health Platform for Citizens, Doctors, and Administrators",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
