import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "CourseMate - AI Learning Assistant",
  description: "Your intelligent companion for Coursera courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 