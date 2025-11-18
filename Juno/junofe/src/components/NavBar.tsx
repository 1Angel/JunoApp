"use client"

import { Home, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

interface NavLinks {
  title: string;
  path: string;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://tse4.mm.bing.net/th/id/OIP.c0ZvaPCNF3ovbkxVQKL3pAHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
  })
  const handleSignIn = () => {
    // Simulate sign in
    setIsAuthenticated(true)
    setIsMenuOpen(false)
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setIsProfileOpen(false)
  }

  const navLinks: NavLinks[] = [
    {
      title: "Inicio",
      path: "/"
    },
    {
      title: "Buscar",
      path: "/properties?page=1&homestatus=FOR_SALE&minPrice=1000&maxPrice=30000"
    },
    {
      title: "Sobre Nosotros",
      path: "/about"
    }
  ]


  return (
    // <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex h-16 items-center justify-between">
    //       <div className="flex items-center gap-2">
    //         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-700">
    //           <Home className="w-6 h-6 text-primary-foreground" />
    //         </div>
    //         <span className="text-xl font-bold text-foreground">Juno</span>
    //       </div>

    //       <nav className="hidden md:flex items-center gap-8">
    //         <Link href={{ pathname: '/properties', query: { page: '1', homestatus: 'FOR_SALE', minPrice: '1000', maxPrice: '30000' } }} className="text-sm text-foreground hover:text-primary transition-colors">Buy</Link>
    //         <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Sell</a>
    //         <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Rent</a>
    //         <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">About</a>
    //       </nav>
    //       <Link href={'/auth/login'}>
    //         <Button className="bg-red-700 hover:bg-red-800/90 text-primary-foreground cursor-pointer">Sign In</Button>
    //       </Link>
    //     </div>
    //   </div>
    // </header>
    <>
      {/* Top Navigation Bar */}
        <div className="sticky top-0 z-40 border-b border-gray-200 bg-white w-full">        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-red-700 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="hidden sm:inline text-xl font-bold text-foreground">Juno</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={`${link.path}`}
                  className="text-foreground font-medium hover:text-gray-600 transition-colors text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                // User Profile Dropdown
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={userProfile.avatar || "/placeholder.svg"}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-medium text-foreground text-sm">{userProfile.name}</p>
                        <p className="text-gray-500 text-xs">{userProfile.email}</p>
                      </div>
                      <div className="py-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-foreground text-sm hover:bg-gray-50 transition-colors"
                        >
                          My Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-foreground text-sm hover:bg-gray-50 transition-colors"
                        >
                          My Properties
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-foreground text-sm hover:bg-gray-50 transition-colors"
                        >
                          Settings
                        </a>
                      </div>
                      <div className="border-t border-gray-200 py-2">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-red-700 text-sm hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Sign In Button
                <Button 
                  onClick={handleSignIn}
                  className="hidden sm:inline px-6 py-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 transition-colors text-sm"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={`${link.path}`}
                    className="text-foreground font-medium hover:text-gray-600 transition-colors px-2 py-1"
                  >
                    {link.title}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-2 py-2 mb-3">
                      <img
                        src={userProfile.avatar || "/placeholder.svg"}
                        alt={userProfile.name}
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">{userProfile.name}</p>
                        <p className="text-gray-500 text-xs">{userProfile.email}</p>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-foreground text-sm hover:bg-gray-50 rounded-md transition-colors"
                    >
                      My Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-foreground text-sm hover:bg-gray-50 rounded-md transition-colors"
                    >
                      My Properties
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-foreground text-sm hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="w-full mt-2 px-4 py-2 text-red-700 text-sm hover:bg-red-50 flex items-center justify-start gap-2 transition-colors rounded-md"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="w-full px-4 py-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 transition-colors mt-2"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </>

  )
}   