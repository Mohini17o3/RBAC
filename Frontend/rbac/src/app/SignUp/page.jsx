'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter() ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://rbac-x6hw.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setTimeout(() => {
        router.push("/Login");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:block h-full">
        <img
          src="setting2.jpg"
          alt="setting"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center bg-purple-50 p-4 md:p-8">
        <Card className="w-full max-w-[400px] bg-white border border-purple-200 shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-purple-700 text-2xl font-semibold">
              Sign Up
            </CardTitle>
            <CardDescription>Access your account by logging in.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-purple-700 font-medium" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-purple-700 font-medium" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-purple-700 font-medium" htmlFor="role">
                  Role
                </Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="admin/user"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-purple-700 font-medium" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4">
                <Link href="/">
                  <Button className="w-full md:w-auto" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-purple-600 text-white hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <p className="mt-4 text-sm text-gray-600">
          Already a User?{" "}
          <Link href="/Login">
            <span className="text-purple-500 underline hover:text-purple-400">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
