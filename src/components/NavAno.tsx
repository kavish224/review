"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User } from 'next-auth'
import { Button } from "./ui/button"

const NavAno = () => {
    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="/" className="text-xl font-bold mb-4 md:mb-0">True Feedback</a>
                <div className="flex justify-center items-center ml-2">
                    <div className="pr-4">
                        Want to Accept Anonymous Feedbacks
                    </div>
                    <Link href={"/"}>
                    <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavAno