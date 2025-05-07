import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6';
import { MdOutlineSearch } from "react-icons/md";


const Header = () => {
  return (
    <div className='flex w-full h-[80px]  padding-px justify-between gap-4 items-center sticky top-0 z-20 bg-blue-100 '>
{/* nav left */}
        <div className="flex flex-1 sm:gap-8 gap-4">
            {/* logo section  */}


<span className="center">
<Link aria-label='home' href={'/'}>
<Image loading='lazy' src={'https://images.apollo247.in/images/icons/apollo247.svg'} width={50} alt='logo' height={30}/>
</Link>
</span>

{/* search -section */}

<label htmlFor='search123' className=" border-1 rounded-md p-2 min-w-[100px] flex-1 group flex items-center max-w-[600px] gap-2">

<MdOutlineSearch  className='text-xl'/>
<input type='search' id='search123' className='flex-1 outline-none focus:placeholder:text-slate-100' placeholder='Search here.....'/>
</label>
        </div>

{/* tittle section  */}

<span className="flex-1 flex justify-end">

    <Link href="add-doctor" className='bg-purple-500 p-3 text-slate-200 rounded-md capitalize cursor-pointer hidden sm:flex active:scale-90 transition ease duration-500' > add doctor</Link>

    <Link  aria-label="add-doctor" href="add-doctor" className='bg-purple-500 p-3 text-slate-200 rounded-md capitalize cursor-pointer sm:hidden active:scale-90 transition ease duration-500' ><FaUserDoctor /> </Link>


</span>

    </div>
  )
}

export default Header