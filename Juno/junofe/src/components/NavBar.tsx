import Link from "next/link";

export default function NavBar() {

    const isLogegedIn = false;

    return (
        <nav className="border-b-1 border-black bg-white">
            <div>
                <div className="flex justify-between">
                    <div className="flex">
                        <div>
                            <img src="infinityLogo.png" className="size-12 cursor-pointer" alt="logo here" />
                        </div>
                        <button className="m-2 font-medium cursor-pointer border-b-4 border-transparent hover:border-red-500" ><Link href='/'>Home</Link></button>
                        <button className="m-2 font-medium cursor-pointer border-b-4 border-transparent hover:border-red-500" >Find a Job</button>
                        <button className="m-2 font-medium cursor-pointer border-b-4 border-transparent hover:border-red-500">Find a Company</button>

                        {/* <div className="m-2 pl-4 p-1 border-1 rounded-3xl focus-within:border-red-500 focus-within:border-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="size-6 inline-block text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input className="w-90 rounded-3xl  pl-2 focus:outline-none" placeholder="Search your dream job" type="text" />
                        </div> */}
                    </div>
                    {/* <!-----autenticacion---> */}
                    <div className="flex m-2">
                        {!isLogegedIn ? (
                            <>
                                <div>

                                    <button className="m-2 font-medium cursor-pointer border-b-4 border-transparent hover:border-red-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg><Link href={'/auth/login'}>Login</Link></button>
                                </div>
                                <div>
                                    <button className="m-2 font-medium cursor-pointer border-b-4 border-transparent hover:border-red-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg><Link href="/auth/register">Register</Link></button>
                                </div>
                            </>
                        ) : (
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                    <button className="m-2 font-medium cursor-pointer border-b-4 border-transparent hover:border-red-500">Hola jiji</button>
                                </div>
                        )}
                    </div>

                </div>
            </div >
        </nav >
    )
}