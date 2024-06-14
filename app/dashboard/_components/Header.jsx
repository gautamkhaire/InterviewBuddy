"use client";

import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton,useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';

function Header() {
    // const { user,isLoaded } = useUser();
    const path = usePathname();
    // useEffect(()=>{
    //     console.log(path)
    // },[])

    // if(!isLoaded)
    //     return null;

  return (
    <header className='flex py-4 px-10 items-center justify-between bg-secondary shadow-sm'>
        <div className='flex justify-center items-center gap-2'>
            <Image src="/logo.png" width={52} height={52} alt="Logo"/>
            <h2 className='font-bold text-lg text-purple-600'>Interview Buddy</h2>
        </div>
        <ul className='hidden md:flex gap-10 w-2/3 items-center justify-center'>
            <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${path==='/dashboard' && 'text-purple-500 font-bold'}`}>Dashboard</li>
            <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${path==='/dashboard/questions' && 'text-purple-500 font-bold'}`}>Questions</li>
            <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${path==='/dashboard/upgrade' && 'text-purple-500 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${path==='/dashboard/how' && 'text-purple-500 font-bold'}`}>How it Works?</li>
        </ul>
        {/* <div className='flex justify-center items-center gap-2'>
                <UserButton/> <span className='hidden md:flex font-semibold text-gray-600'>{user.fullName}</span> 
        </div> */}
        <div className='w-1/12 flex justify-center items-center'>
            <UserButton afterSignOutUrl={"/"}/>
        </div>
        
        
    </header>
  )
}

export default Header