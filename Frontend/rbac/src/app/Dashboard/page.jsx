  'use client';
  import { useRouter } from "next/navigation";
  import { AppSidebar } from "../components/Sidebar";
  import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { useEffect, useState } from "react";
  import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

  function DashBoard() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [currentUser , setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: ''
    });
    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setCurrentUser(data.currentUser);
          if (data.currentUserRole === "admin") {
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

    const handleEditClick = (user) => {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role.name || '',
      });
      setIsDialogOpen(true);
    };

    const handleUpdateUser = async () => {
      console.log(formData);
      try {
        const token = localStorage.getItem("token");

         const isupdate = Boolean(editingUser) ;

        const response = await fetch(
           isupdate ? 
          
          
          `http://localhost:8000/users/${editingUser.id}`  :   "http://localhost:8000/users", 
          {
          method:  isupdate ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });



        if (response.ok) {
          const updatedUser = await response.json();

          if(isupdate) {
            setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
            alert("User updated successfully!");
            await fetchUsers();

          } else {
            setUsers([...users , updatedUser]) ;
            alert("user created successfully");
            await fetchUsers();

          }

          setIsDialogOpen(false);


        } else {
          alert(isupdate ? "Failed to update user. Please try again." : "Failed to create user. Please try again.");
        }

      } 
      
      catch (error) {
        console.error("Error updating user:", error);
        alert("Sorry , Something went wrong ");
      }
    };




    const handleDeleteClick = (userId) => {
      setDeleteUserId(userId);
    };

    const handleConfirmDelete = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/users/${deleteUserId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== deleteUserId));
          setDeleteUserId(null);
          alert("User deleted successfully!");
          await fetchUsers();
        } else {
          alert("Failed to delete user. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Something went wrong while deleting the user.");
      }
    };

    const handleCancelDelete = () => {
      setDeleteUserId(null);
    };

    const handleCreateClick = () => {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password : '', 
        role: ''
      });
      setIsDialogOpen(true);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <>
        <SidebarProvider>
          <div className="flex h-screen w-screen bg-gray-50">
            <div className="absolute top-4 left-4 z-50">
              <SidebarTrigger onClick={() => setSidebarOpen(!sidebarOpen)} />
            </div>
            <AppSidebar />
            <div className="flex-1 p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">User Management</h1>
                {isAdmin && (
                  <Button onClick={handleCreateClick} variant="primary">
                    Create User
                  </Button>
                )}
              </div>
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
                      <p>Role: {user.role ? user.role.name : ' '}</p>
                      <p>Status: {user.status ? "Active" : "Inactive"}</p>
                      </CardContent>
                      <CardFooter className="space-x-2">
                        {isAdmin && (
                          <>
                            <Button onClick={() => handleEditClick(user)} variant="outline">
                              Edit
                            </Button>
                            <Button onClick={() => 

                            { console.log("Clicked User ID:", user.id);
                              handleDeleteClick(user.id)
                              }} variant="destructive">
                              Delete
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SidebarProvider>

        <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded-md mt-4"
              />
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="temporary password"
                className="w-full p-2 border rounded-md mt-4"
              />
              <Select value={formData.role || ""} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="w-full mt-4">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="user">user</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateUser} variant="primary">
                {editingUser ? "Update User" : "Create User"}
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {deleteUserId && (
          <Dialog open={true} onOpenChange={(open) => setDeleteUserId(deleteUserId)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this user?</p>
              <DialogFooter>
                <Button onClick={handleConfirmDelete} variant="destructive">
                  Confirm
                </Button>
                <Button onClick={handleCancelDelete} variant="outline">
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }

  export default DashBoard;
