'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from './types';

interface HeaderClientProps {
  categories: Category[];
}

export default function HeaderClient({ categories }: HeaderClientProps) {
  return (
    <header className='w-full px-4 py-3'>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <Image
            src="/images/health-food-trivia-avocado-logo.png"
            alt="Logo"
            width={442/4}
            height={435/4}
            priority
            className='pr-2'
          />
          <span className='min-w-[164px]'>Health Food Trivia</span>
        </h1>

        <nav className="hidden lg:flex space-x-6 items-center">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/trivia-games/${category.name}`}
              className="hover:text-green-600 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="lg:hidden mt-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/trivia-games/${category.name}`}
                className="bg-mint-50 px-3 py-1 rounded-full text-sm hover:bg-teal-100 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}