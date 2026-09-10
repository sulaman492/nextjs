import React from 'react'
// import Link from "next/Link"
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <ul className='flex gap-2'>
        <li > <Link href="/">Home</Link></li>
        <li > <Link href="/about">about</Link></li>
        <li > <Link href="contact">contact</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
