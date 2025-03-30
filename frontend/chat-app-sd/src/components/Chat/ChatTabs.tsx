'use client'

import { useContext, useState } from "react"
import ChatList from "./ChatList";
import { ChatContext } from "@/context/ChatContext";
import NewChatButton from "./NewChatButton";
import NewGroupButton from "./NewGroupButton";

export default function ChatTabs(){

  
      const {state, dispatch} = useContext(ChatContext);
      const {chats, activeChatId} = state;

    return (
    <div className=" flex flex-col gap-8 h-full">
      <div className="flex justify-around m-4">
        <NewChatButton />
        <NewGroupButton />
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div>
         <ChatList />
        </div>
      </div>
      
    </div>
    );

}