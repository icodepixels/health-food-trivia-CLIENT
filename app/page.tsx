
export default async function CategoriesPage() {

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to Health Food Trivia</h1>
      <h2 className="text-xl mb-4">Choose a category to get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Vegan-focused Trivia</h3>
          <p className="text-gray-600">Test your knowledge about nutrition and healthy eating.</p>
        </div>
      </div>

    </main>
  );
}