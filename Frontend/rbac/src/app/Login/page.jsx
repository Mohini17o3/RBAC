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
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    

    const router = useRouter() ;
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("https://rbac-x6hw.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login success");
                localStorage.setItem("token", data.token);
                    router.push("/Dashboard") ;

             
            } else {
                const error = await response.json();
                console.error("Login failed", error.message);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="hidden md:block h-full">
                <Image
                    src="/setting2.jpg"
                    alt="setting"
                    width="1920" 
                    height="1080"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col justify-center items-center bg-purple-50 p-4 md:p-8">
                <Card className="w-full max-w-[400px] bg-white border border-purple-200 shadow-lg p-6">
                    <CardHeader>
                        <CardTitle className="text-purple-700 text-2xl font-semibold">
                            Login
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Access your account by logging in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="email" className="text-purple-700 font-medium">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your email address"
                                        className="focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="password" className="text-purple-700 font-medium">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Your password"
                                        className="focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <CardFooter className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 mt-4">
                                <Link href="/">
                                    <Button variant="outline" className="w-full md:w-auto">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    className="bg-purple-600 text-white w-full md:w-auto hover:bg-purple-700"
                                    disabled={loading}
                                >
                                    {loading ? "Logging In..." : "Login"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
                <p className="mt-4 text-sm text-gray-600">
                    New User?{" "}
                    <Link href="/SignUp">
                        <span className="text-purple-500 underline hover:text-purple-400">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
