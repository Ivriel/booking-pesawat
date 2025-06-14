import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {  Plane, Ticket, User } from "lucide-react";
import ButtonLogout from "./components/button-logout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard"
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {session,user}= await getUser()

  if(session === null || user.role === "CUSTOMER") {
    redirect('/dashboard/signin')
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <section>
          <nav className="border-b border-muted p-5">
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-primary text-2xl">FlySha Dashboard</span>
            </div>
          </nav>
          <section className="flex flex-row gap-5 items-start flex-nowrap">
            <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
              <div className="space-y-2">
                <Button asChild className="w-full justify-start" variant={"ghost"}>
                  <Link href={'/'}>Dashboard</Link>
                </Button>
              </div>

               <div className="space-y-2">
                <div className="uppercase text-xs font-bold">Master Data</div>
                <Button asChild className="w-full justify-start" variant={"ghost"}>
                  <Link href={'/dashboard/airplanes'}>
                    <Plane className="mr-2 w-4 h-4"/>
                  Airplanes
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant={"ghost"}>
                  <Link href={'/dashboard/flights'}>
                    <Ticket className="mr-2 w-4 h-4"/>
                  Flights
                  </Link>
                </Button>
                 <Button asChild className="w-full justify-start" variant={"ghost"}>
                  <Link href={'/dashboard/tickets'}>
                    <Plane className="mr-2 w-4 h-4"/>
                 Tickets
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant={"ghost"}>
                  <Link href={'/dashboard/users'}>
                    <User className="mr-2 w-4 h-4"/>
                  Users
                  </Link>
                </Button>
              </div>
            <ButtonLogout />
            </section>
            <section className="grow mr-5 mt-5 h-[87vh] overflow-y-auto">
            {children}
          </section>
          </section>
        </section>
      </body>
    </html>
  );
}
