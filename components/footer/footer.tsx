import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image src="" className="h-8" alt="Logo" width={32} height={32} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">BedWood</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 ">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-700 sm:text-center ">
          © 2024{' '}
          <Link href="" className="hover:underline">
            BedWood™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
