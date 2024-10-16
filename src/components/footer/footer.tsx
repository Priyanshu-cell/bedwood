'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserTie } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa";
import AssociateForm from '@/src/form/assiociate';
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export function Footer() {
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility

  return (
    <footer className="bg-inherit">
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Flex container for desktop layout */}
        <div className="flex flex-col md:flex-row items-start justify-between">

          {/* Logo and Company Associate button */}
          <div className="flex flex-col  gap-y-2 items-start mb-4 md:mb-0 md:items-start">
            {/* Logo on the left */}
            <Link href="" className="flex md:items-center space-x-3">
              <Image src="/logo.png" className="h-20" alt="Logo" width={300} height={400} />
            </Link>

            <div className='flex flex-row w-full items-start gap-2 ml-5 md:ml-5'>
              <a href="https://www.facebook.com/profile.php?id=61565700196739&mibextid=ZbWKwL
" target="_blank" rel="noreferrer" className="text-2xl text-blue-500 hover:text-blue-700">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/bedwood_furnishing_/profilecard/?igsh=MTdodjc0NGN2emxyYg==
" target="_blank" rel="noreferrer" className="text-2xl text-red-500 hover:text-red-700">
                <FaInstagramSquare />
              </a>
              <a href="https://www.linkedin.com/company/bedwood-furnishing/" target="_blank" rel="noreferrer" className="text-2xl text-blue-500 hover:text-blue-700">
                <FaLinkedin />
              </a>
              <a href="https://x.com/BedwoodFurnish?t=U2xuHD4kyimLI-TsSpLe9A&s=09" target="_blank" rel="noreferrer" className="text-2xl">
                <FaSquareXTwitter />
              </a>
              <a href="https://youtube.com/@bedwoodfurnishing?si=dIEgxhM_r2mJsqUp
" target="_blank" rel="noreferrer" className="text-2xl text-red-500 hover:text-red-700">
                <FaSquareYoutube />
              </a>

            </div>

            {/* Company Associate form */}
            <div className='flex flex-col items-start space-y-2 ml-5'>
              <p className="text-xl font-sans text-balance">Become a Company Associate and join our journey to success!</p>
              <button
                className="flex items-center space-x-2 bg-black text-white p-2 rounded hover:bg-gray-700"
                onClick={() => setIsFormOpen(true)} // Open form on click
              >
                <FaUserTie className="text-xl" /> {/* Icon next to Join button */}
                <span>Join</span>
              </button>
            </div>
          </div>

          {/* Links in a row for both small and large screens */}
          <div className="flex flex-col md:items-start space-y-4 ml-5 md:ml-0 md:mt-8">
            <h2 className='text-xl font-semibold'>Company</h2>
            <ul className='flex md:flex-col flex-row space-x-6 md:space-y-3 md:space-x-0  text-md font-medium text-gray-500'>
              <li>
                <Link href="#" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-gray-400 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-700 sm:text-center md:pb-6">
          © 2024{' '}
          <Link href="" className="hover:underline">
            BedWood™
          </Link>
          . All Rights Reserved.
        </span>
      </div>

      {/* Conditionally render the form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 opacity-75 absolute inset-0"></div>
          <AssociateForm onClose={() => setIsFormOpen(false)} /> {/* Close form on button click */}
        </div>
      )}
    </footer>
  );
}


