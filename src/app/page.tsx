'use client';
import "./globals.css";
import { BotOpen } from "./components/BotOpen";
import { useState } from "react";
import { ChatBox } from "./components/ChatBox";
export default function Home() {
  const [chatBotOpen, setChatBotOpen] = useState(false);
  return (
    <div>
      {chatBotOpen ? (
        <ChatBox handleClose={setChatBotOpen} />
      ) : (
        <BotOpen handleOpen={setChatBotOpen} />
      )}
    </div>
  );
}
