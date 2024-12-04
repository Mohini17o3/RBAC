'use client';

import { Calendar as CalendarIcon, Home, Inbox, Lock, Search, User  , Notebook, NotebookIcon} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog , DialogContent , DialogTrigger , DialogTitle  , DialogHeader} from  "@/components/ui/dialog";
import { Editor, EditorState , convertToRaw, convertFromRaw} from "draft-js";
import "draft-js/dist/Draft.css";
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
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: CalendarIcon },
  { title: "Search", url: "#", icon: Search },
  { title: "notes", url: "#", icon: Notebook },
];

export function AppSidebar() {
  const [date, setDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null); 
  const router = useRouter();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isViewingNote, setIsViewingNote] = useState(false);
  const [viewingNoteContent, setViewingNoteContent] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
 

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    setSavedNotes(notes);
  }, []);


  const saveNote = () => {
    const contentState = editorState.getCurrentContent();
    const note = {
      id: selectedNote ? selectedNote.id : Date.now(),
      content: convertToRaw(contentState),
    };

    let updatedNotes;
    if (selectedNote) {
      updatedNotes = savedNotes.map((n) => (n.id === selectedNote.id ? note : n));
    } else {
      updatedNotes = [...savedNotes, note];
      alert("Note created")

    }
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSavedNotes(updatedNotes);

    setEditorState(EditorState.createEmpty());
    setSelectedNote(null);
  };


  const deleteNote = (noteId) => {
    const updatedNotes = savedNotes.filter((note) => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSavedNotes(updatedNotes);


    if (selectedNote && selectedNote.id === noteId) {
      setEditorState(EditorState.createEmpty());
      setSelectedNote(null);
    }
  };


  const loadNote = (note) => {
    const contentState = convertFromRaw(note.content);
    setEditorState(EditorState.createWithContent(contentState));
    setSelectedNote(note);
    setViewingNoteContent(note);
    setIsViewingNote(true);

  };


  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://rbac-x6hw.onrender.com/users", {
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
                            <button className="flex flex-row items-center w-full p-2 rounded gap-2 hover:bg-white transition duration-300 ">
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
                      ) : item.title === 'notes'? (<Drawer>
                <DrawerTrigger>
                  <div className="flex flex-row items-center p-2 cursor-pointer w-full hover:bg-white hover:rounded-md">
                    <NotebookIcon size={20} />
                    <span>Notes</span>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{selectedNote ? "Edit Note" : "Create Note"}</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-4">
                    <div className="border p-4 rounded-md h-64">
                      <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                        placeholder="Write your notes here..."
                      />
                    </div>
                    <Button onClick={saveNote} className="w-full">
                      {selectedNote ? "Update Note" : "Save Note"}
                    </Button>
                  </div>
                </DrawerContent>
              </Drawer>) 
: <Link href={item.url} className="w-full flex items-center gap-2 p-2 rounded hover:bg-white">
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>   }
                   
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
          <SidebarGroupLabel>Saved Notes</SidebarGroupLabel>
          <SidebarMenu>
            {savedNotes.map((note) => (
              <SidebarMenuItem key={note.id} className="cursor-pointer hover:bg-white hover:rounded-md">
                <div className="flex justify-between items-center w-full">
                  <div onClick={() => loadNote(note)}>
                    <NotebookIcon size={20} />
                    <span className="ml-2">
                      Note {new Date(note.id).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Delete
                  </button>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {isViewingNote && viewingNoteContent && (
        <Dialog open={isViewingNote} onOpenChange={setIsViewingNote}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>View Note</DialogTitle>
            </DialogHeader>
            <div className="p-4 border rounded-md h-64 overflow-auto">
              <Editor
                editorState={EditorState.createWithContent(
                  convertFromRaw(viewingNoteContent.content)
                )}
                readOnly
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
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