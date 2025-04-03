import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import Aurora from "@/components/ReactBits/Backgrounds/Aurora/Aurora";
import clsx from "clsx";
import SplashCursor from "@/components/ReactBits/Animations/SplashCursor/SplashCursor";
import { User } from "lucide-react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="fixed inset-0 -z-10">
          <Aurora
            colorStops={["#01213a", "#01411f", "#005d55"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <SplashCursor
          DENSITY_DISSIPATION={5}
          COLOR_UPDATE_SPEED={15}
          SPLAT_RADIUS={0.02}
          SPLAT_FORCE={9000}
          TRANSPARENT={true}
        />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Link href="/my" className="fixed bottom-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition-colors">
            <User className="h-4 w-4 text-white" />
          </Link>

          {children}
        </Providers>
      </body>
    </html>
  );
}
