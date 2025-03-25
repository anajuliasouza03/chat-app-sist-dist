'use client'

import { useContext, useState } from "react"
import ChatList from "./ChatList";
import { ChatContext } from "@/context/ChatContext";

export default function ChatTabs(){

  
      const {state, dispatch} = useContext(ChatContext);
      const {chats, activeChatId} = state;

    return (
    <div className="">
      <div className="flex justify-around m-4">
        <button className="cursor-pointer">
          {/*<NewChatButton />*/}
          + Novo Chat
        </button>
        <button className="cursor-pointer">
           {/*<NewGroupButton />*/}
          + Novo Grupo
        </button>

      </div>

      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-8">
        <div>
         <ChatList />
        </div>
      </div>
      
    </div>
    );

}