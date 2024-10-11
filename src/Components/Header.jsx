import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const {user,isSignedIn} = useUser();
  return (
    <div className='flex px-4 items-center h-[4rem] justify-between mx-auto shadow-md'>
      <img src="/logo.svg" alt="" />
    {
        isSignedIn?
        <div className='flex justify-center items-center gap-x-5'>
                <Link to={'/dashboard'}>  <button className='w-[9rem] bg-purple-500 text-white  rounded-xl h-[3rem]'>Dashboard</button></Link>

               <div className=' rounded-full w-[2rem] flex justify-center  items-center h-[2rem] border-[6px] border-purple-500'>
               <UserButton/>
                </div> 
        </div>:
        <Link to={'/auth/sign-in'}>  <button className='w-[9rem] bg-purple-500 text-white rounded-xl h-[3rem]'>Get Started</button></Link>

    }

    </div>
  )
}

export default Header
