// import TitleBar from "@/features/titlebar/components";
import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
// import reactLogo from "../assets/react.svg";
import { AppSidebar } from "@/features/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Workarea from "@/features/workarea";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <SidebarProvider className="pt-4">
      <AppSidebar />
      <Workarea />
    </SidebarProvider>
    // <div className="flex flex-col w-full h-full">
    //   <TitleBar />
    //   <div className="p-2">
    //     <h1>Welcome to Tauri + React</h1>

    //     <div className="row">
    //       <a href="https://vitejs.dev" target="_blank">
    //         <img src="/vite.svg" className="logo vite" alt="Vite logo" />
    //       </a>
    //       <a href="https://tauri.app" target="_blank">
    //         <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
    //       </a>
    //       <a href="https://reactjs.org" target="_blank">
    //         <img src={reactLogo} className="logo react" alt="React logo" />
    //       </a>
    //     </div>
    //     <p>Click on the Tauri, Vite, and React logos to learn more.</p>

    //     <form
    //       className="row"
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         greet();
    //       }}
    //     >
    //       <input
    //         id="greet-input"
    //         onChange={(e) => setName(e.currentTarget.value)}
    //         placeholder="Enter a name..."
    //       />
    //       <button type="submit">Greet</button>
    //     </form>
    //     <p>{greetMsg}</p>
    //   </div>
    // </div>
  );
}
