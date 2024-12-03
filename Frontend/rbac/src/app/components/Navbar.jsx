'use client' ; 
import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
    
    const [isTokenExpired , setIsTokenExpired] = useState(false) ;

    useEffect(()=>{

        const localToken = localStorage.getItem("token") ;

        if(localToken){
            const decodedToken = JSON.parse(atob(localToken.split(".")[1]));

             if(decodedToken.exp *1000 < Date.now()) {
                localStorage.removeItem("token");
                setIsTokenExpired(true) ;
             } else{
                setIsTokenExpired(false) ;
             }
        } else {
            setIsTokenExpired(true) ;

        }
    } , [])

    return (
        <>
   <div className="flex justify-between items-center top-0 w-screen fixed p-2 bg-purple-300 shadow-md z-10">
   <div className="flex space-x-6 "> 
    <a href="/" className="cursor-pointer text-purple-500 hover:text-gray-300 transition font-bold" >Home</a>
    <a className="cursor-pointer text-purple-500 hover:text-gray-300 font-bold transition">Features</a>
    <a className="cursor-pointer text-purple-500 hover:text-gray-300 font-bold transition">Contact</a>
  
    </div>
    <div className="flex flex-row gap-0">
     {
        isTokenExpired ? (<Link href="/Login">
    <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition mr-4">
     Login
    </button>
     </Link>  ) :( <Link href="/Dashboard">
    <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition mr-4">
     Dashboard
    </button> </Link>)
     }
    
    <Link href="/SignUp">
    <button className="bg-white text-purple-500 px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition mr-4">
                Sign Up
    </button>
     </Link> 
     </div>     
   </div>
        </>
    ) ;
}

export default Navbar ; 