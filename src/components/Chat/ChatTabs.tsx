'use client'

import { useState } from "react"
import ChatList from "./ChatList";

export default function ChatTabs(){

    return (
    <div className="">
      <div className="flex justify-around m-4">
        <button>
          {/*<NewChatButton />*/}
          + Novo Chat
        </button>
        <button>
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