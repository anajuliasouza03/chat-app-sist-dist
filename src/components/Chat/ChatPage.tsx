'use client';


import Sidebar from "./Sidebar";
import ChatTabs from "./ChatTabs";
import { useView } from "@/context/ViewContext";
import ContactList from "./ContactList";


export default function ChatPage() {

  const { view } = useView();

  return (
    <div className="text-black h-screen w-screen grid grid-cols-[100px_350px_1fr] bg-white">
      <Sidebar />
      <div className="">
        {view === 'chats' ? <ChatTabs /> : <ContactList />}
      </div>

    </div>
  );
}
