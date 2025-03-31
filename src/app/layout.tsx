import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import SplashCursor from "@/ReactBits/Animations/SplashCursor/SplashCursor";
import Aurora from "@/ReactBits/Backgrounds/Aurora/Aurora";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manzo's Page",
  description: "Manzo's Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <div className="fixed inset-0 -z-10">
        <Aurora
  colorStops={["#01213a", "#01411f", "#005d55"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
        </div>
        <AppRouterCacheProvider>
        <SplashCursor 
      DENSITY_DISSIPATION={5}
      COLOR_UPDATE_SPEED={15}
      SPLAT_RADIUS={0.02}
      SPLAT_FORCE={9000}
      TRANSPARENT={true}
    />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
