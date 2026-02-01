"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getTodayDate } from '@/lib/utils';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const todayDate = getTodayDate();

  const navItems = [
    { href: '/', label: 'Today' },
    { href: '/live', label: 'Live' },
    { href: `/fixtures/${todayDate}`, label: 'Fixtures' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={closeMenu}>
            <span className="text-2xl">⚽</span>
            <span className="text-xl font-bold text-white">Football Tracker</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              // Check if current route matches this nav item
              let isActive = pathname === item.href;
              
              // Special handling for fixtures route (includes dynamic [date])
              if (item.label === 'Fixtures' && pathname.startsWith('/fixtures')) {
                isActive = true;
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1cca5b] text-black'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navItems.map((item) => {
              // Check if current route matches this nav item
              let isActive = pathname === item.href;
              
              // Special handling for fixtures route (includes dynamic [date])
              if (item.label === 'Fixtures' && pathname.startsWith('/fixtures')) {
                isActive = true;
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1cca5b] text-black'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;