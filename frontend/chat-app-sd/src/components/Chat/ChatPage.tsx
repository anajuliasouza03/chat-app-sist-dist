'use client';


import Sidebar from "./Sidebar";
import ChatTabs from "./ChatTabs";
import { useView } from "@/context/ViewContext";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";


export default function ChatPage() {

  const { view } = useView();

  return (
    <div className="text-black h-screen w-screen grid grid-cols-[100px_350px_1fr] bg-white">
      <Sidebar />
      <div className="h-screen overflow-hidden">
        {view === 'chats' ? <ChatTabs /> : <ContactList />}
      </div>
    <div className="border-l border-gray-200 h-screen flex flex-col">
      <ChatWindow />
    </div>

    </div>
  );
}
