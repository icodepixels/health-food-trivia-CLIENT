'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '../types';

interface HeaderClientProps {
  categories: Category[];
}

export default function HeaderClient({ categories }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='w-full flex flex-wrap items-center'>
      <Link href="/" className="hover:opacity-90 transition-opacity">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <Image
            src="/images/health-food-trivia-avocado-logo.png"
            alt="Plant-based Trivia the Vegan Edition Logo"
            width={442/4}
            height={435/4}
            priority
            className='pr-2'
          />
          <span className='min-w-44'>Plant-based Trivia</span>
        </h1>
      </Link>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden ml-auto p-2 hover:bg-[#43855b]/10 rounded-lg transition-colors"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`h-0.5 w-full bg-[#2d5d3c] transition-all ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`h-0.5 w-full bg-[#2d5d3c] transition-all ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`h-0.5 w-full bg-[#2d5d3c] transition-all ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 items-center ml-auto">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/quizzes/${category.name}`}
            className="hover:text-[#43855b] transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-[72px] left-0 right-0 w-full lg:hidden
        px-4 z-50 max-h-[calc(100vh-72px)] overflow-y-auto
        ${isMenuOpen ? 'block' : 'hidden'}
      `}>
        <nav className="bg-white rounded-lg shadow-lg border border-[#43855b]/10">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/quizzes/${category.name}`}
              className="block px-4 py-3 hover:bg-[#43855b]/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}