import HeaderClient from './HeaderClient';
import { Category } from '../types';

async function getCategories(): Promise<string[]> {
  const response = await fetch('http://127.0.0.1:9000/api/categories', {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

export default async function Header() {
  const categoryNames = await getCategories();
  const categories: Category[] = categoryNames.map(name => ({
    name,
    image: `/images/${name}.jpg`
  }));

  return <HeaderClient categories={categories} />;
}