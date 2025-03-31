import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import SplashCursor from "@/ReactBits/Animations/SplashCursor/SplashCursor";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
        <SplashCursor 
      DENSITY_DISSIPATION={5}
      COLOR_UPDATE_SPEED={15}
      SPLAT_RADIUS={0.01}
      SPLAT_FORCE={9000}
      TRANSPARENT={true}
    />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
