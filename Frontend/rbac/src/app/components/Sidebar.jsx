'use client';
import { Calendar, Home, Inbox, Lock, Search, Settings, User } from "lucide-react"
import { useState } from "react" 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"



  

const items = [

    {
        title: "Home" , 
        url: "/", 
        icon : Home, 
    }  ,
    {
        title: "Inbox" , 
        url: "#", 
        icon : Inbox, 
    }  ,
    {
        title: "Calendar" , 
        url: "#", 
        icon :Calendar, 
    }  ,
    {
        title: "Search" , 
        url: "#", 
        icon : Search, 
    }  ,
    {
        title: "Create User" , 
        url: "#", 
        icon : User, 

    }  ,
    {
        title: "Log Out" , 
        url: "/", 
        icon : Lock, 
        
    }  ,

]
export function AppSidebar() {


    
const router = useRouter();

   const handleLogout = ()=>{
    localStorage.removeItem("token");
    router.push("/Login");
   }

 

  return (
<>


    <Sidebar >
    <SidebarContent className = "bg-purple-300 border shadow-md">
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                {item.title == "Log Out" ? (
                    <Button onClick={handleLogout}>
                    <item.icon />
                     <span>{item.title}</span>
                   </Button>
                ): item.title == "Create User" ?  (
         <Drawer>
      <DrawerTrigger className="flex flex-row"><item.icon />Create User</DrawerTrigger>
       <DrawerContent>
       <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
          ) : 
                
               ( <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>) }  

                  

                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>


  </>
  )
}
