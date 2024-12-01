'use client';
import { useRouter } from "next/navigation";
import { AppSidebar } from "../components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function DashBoard() {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
  const[isAdmin , setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert(true);
      setTimeout(() => {
        router.push("/Login");
      }, 2000);
    } else {
      fetchUsers(token);
    }
  }, [router]);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setUsers(data.users);
        if(data.currentUserRole === "admin"){
          console.log("Admin role detected:", data.currentUserRole);
          setIsAdmin(true);
        }
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (alert) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert className="flex items-start space-x-4 border p-4 rounded-lg bg-red-100 text-red-900 shadow-lg">
          <Terminal className="h-5 w-5 text-red-500" />
          <div>
            <AlertTitle className="font-bold">Heads up!</AlertTitle>
            <AlertDescription className="text-sm">
              You gotta login first!
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50">
          <div
            className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} bg-purple-300 relative`}
          >
            <div className="absolute top-4 left-4 z-50">
              <SidebarTrigger onClick={() => setSidebarOpen(!sidebarOpen)} />
            </div>
            <AppSidebar />
          </div>

          <div
            className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "w-screen"} mt-6 ml-6 `}
          >
            <h1 className="text-2xl font-semibold mb-4">User Management</h1>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <Card key={user.id} className="shadow-md">
                    <CardHeader>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Name: {user.name}</p>
                      <p>Role: {user.role.name}</p>
                      <p>Status: {user.status ? "Active" : "Inactive"}</p>
                    </CardContent>
                    <CardFooter>
                      {isAdmin ? (
                        <Button variant="outline">Edit</Button>
                      ) : null}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default DashBoard;
