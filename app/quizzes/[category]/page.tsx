import CategoryClient from './CategoryClient';
import { API_URL } from '../../utils/api';

async function getQuizzesByCategory(category: string) {
  const res = await fetch(
    `${API_URL}/api/quizzes?category=${category}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch quizzes for category ${category}: ${res.status}`);
  }

  const data = await res.json();
  console.log('API Response:', data); // Debug log
  return data || []; // Access the quizzes array from the response
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const quizzes = await getQuizzesByCategory(decodedCategory);

  return <CategoryClient quizzes={quizzes} category={decodedCategory} />;
}