"use client";
import "./globals.css";
import { useEffect } from "react";
import Pusher from "pusher-js";
import toast, { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const pusher = new Pusher("65934a37501cf42d40e9", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("task-channel");
    channel.bind("task-assigned", (data: any) => {
      toast.success(`${data.message}: ${data.taskTitle}`);
    });
    return () => {
      pusher.disconnect();
    };
  }, []);
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
