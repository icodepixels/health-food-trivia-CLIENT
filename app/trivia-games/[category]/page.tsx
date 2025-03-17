import Link from 'next/link';
import Image from 'next/image';

interface Quiz {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  difficulty: string;
  created_at: string;
}

async function getQuizzesByCategory(category: string) {
  const res = await fetch(
    `http://127.0.0.1:5000/api/quizzes?category=${category}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // Decode the category parameter to handle URL-encoded values
  const decodedCategory = decodeURIComponent(params.category);
  const quizzes = await getQuizzesByCategory(decodedCategory);
  console.log(quizzes);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{decodedCategory} Quizzes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz: Quiz) => (
          <div
            key={quiz.id}
            className="bg-mint-50 rounded-tl-[32px] rounded-br-[32px] overflow-hidden p-6 hover:shadow-lg transition-all border border-green-300 shadow-green-300 flex flex-col justify-between"
          >
            <div className="aspect-[4/3] relative mb-6 rounded-tl-[32px] rounded-br-[32px] overflow-hidden border-8 border-teal-200/60">
              <Image
                // src={quiz.image}
                src="/images/vegan.png"
                alt={quiz.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center px-4">
              <h2 className="text-[32px] leading-tight font-bold text-navy-900 mb-6">
                {quiz.name}
              </h2>
              <Link
                href={`/quiz/${quiz.id}`}
                className="inline-block bg-teal-400 text-white text-xl font-semibold px-12 py-4 rounded-full hover:bg-teal-500 transition-colors"
              >
                Start Quiz!
              </Link>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <p className="text-center text-gray-600">
          No quizzes available for {decodedCategory} yet.
        </p>
      )}
    </div>
  );
}