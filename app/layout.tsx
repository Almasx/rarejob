import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ProgressProvider } from "@/lib/progress-context";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RareJob Practices",
  description: "Daily English exercise companion for Jitsuyo-Eikaiwa students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} antialiased`}>
        <div className="mx-auto max-w-[430px] min-h-dvh">
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </div>
      </body>
    </html>
  );
}
