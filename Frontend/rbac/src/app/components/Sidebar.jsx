'use client';

import { Calendar as CalendarIcon, Home, Inbox, Lock, Search, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog , DialogContent , DialogTrigger , DialogTitle  , DialogHeader} from  "@/components/ui/dialog";


const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: CalendarIcon },
  { title: "Search", url: "#", icon: Search },
];

export function AppSidebar() {
  const [date, setDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null); 
  const router = useRouter();

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser({
          name: data.currentUser,
          role: data.currentUserRole,
          email: data.currentUserEmail,
        });
      } else {
        console.error("Failed to fetch current user");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/Login");
  };

  return (
    <>
      <Sidebar>
        <SidebarContent className="bg-purple-300 border shadow-md">
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Calendar" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex flex-row items-center w-full p-2 rounded gap-2 hover:bg-white  transition duration-300 ">
                              <item.icon size={20} />
                              <span>{item.title}</span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md mx-auto p-4">
                            <DialogHeader>
                              <DialogTitle>Calendar</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                              <Calendar
                                selected={date}
                                onSelect={(selectedDate) => setDate(selectedDate)}
                                className="rounded-md border"
                              />
                              <p className="text-center mt-4">
                                Today’s Date: {date.toDateString()}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )  : (
                      <Link href={item.url} className="w-full flex items-center gap-2 p-2 rounded hover:bg-white">
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {currentUser && (
            <div className="mt-auto p-4 border-t border-gray-300">
              <div className="flex flex-col items-center text-center">
                <User size={40} />
                <h4 className="text-lg font-semibold mt-2">{currentUser.name}</h4>
                <p className="text-sm text-gray-500">{currentUser.role}</p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          )}

          <Button onClick={handleLogout} className="w-full flex items-center gap-2 mb-6">
                        <Lock size={20} />
                        <span>LogOut</span>
                      </Button>
        </SidebarContent>

      </Sidebar>
    </>
  );
}