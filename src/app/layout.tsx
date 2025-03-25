import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ViewProvider } from "@/context/ViewContext";
import { ChatProvider } from "@/context/ChatContext"; 
import { ChatContactsProvider } from "@/context/ChatContactsContext";
import { ActiveChatTypeProvider } from "@/context/ActiveChatTypeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L.L.A App",
  description: "Um sistema de mensagens modernas com React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-700`}
      >
        <AuthProvider>
          <ViewProvider>
            <ChatProvider>
              <ChatContactsProvider >
                <ActiveChatTypeProvider>
                  {children}
                </ActiveChatTypeProvider>
              </ChatContactsProvider>
            </ChatProvider>
          </ViewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
