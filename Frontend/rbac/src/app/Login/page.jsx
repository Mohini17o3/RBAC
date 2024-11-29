'use client'
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
import { useState } from "react";

function Login() {

   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [loading , setLoading] = useState(false);
   const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
  
        const response = await fetch("http://localhost:8000/auth/login" , {
          method :"POST" ,
           headers : {"Content-Type": "application/json", } ,
           body: JSON.stringify({ email, password }),


                });
     
             if(response.ok) {
              const data  = await response.json();
              console.log("login success");
              localStorage.setItem("token" , data.token);
              alert("Login successful");

             }   else {
              const error  = await response.json();
              console.error("login failed"  , error.message);

             }

    } catch(e){
      console.log(e) ;
    } finally {
      setLoading(false);
    }
  }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="h-full hidden md:block">
                <img
                    src="setting2.jpg"
                    alt="setting"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col justify-center items-center bg-purple-50">
                <Card className="w-[90%] max-w-[400px] bg-white border border-purple-200 shadow-lg p-6">
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
                            <div className="grid w-full items-center gap-6">

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
                            <CardFooter className="flex flex-col space-y-4 md:flex-row md:justify-between mt-4">
                    <Link href='/'>
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
              <p className="p-4 text-xl font-bold">New User ?<Link href="/SignUp"><u className="hover:text-purple-400">Sign Up</u></Link></p>  

            </div>
        </div>
    );
}

export default Login;
