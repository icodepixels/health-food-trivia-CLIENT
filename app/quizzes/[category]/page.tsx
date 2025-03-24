import CategoryClient from './CategoryClient';

async function getQuizzesByCategory(category: string) {
  const res = await fetch(
    `http://127.0.0.1:9000/api/quizzes?category=${category}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const quizzes = await getQuizzesByCategory(decodedCategory);

  return <CategoryClient quizzes={quizzes} />;
}