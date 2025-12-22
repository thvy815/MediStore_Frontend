import type { CategoryView } from "@/types/category";

interface Props {
  categories: CategoryView[];
}

export default function FeaturedCategories({ categories }: Props) {
  return (
    <section className="px-6 py-12">
      <h3 className="text-xl font-semibold mb-6">
        Featured Categories
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-green-500 rounded-xl p-4 text-center cursor-pointer hover:bg-green-50"
          >
            <p className="font-medium text-green-700">
              {cat.name}
            </p>

            {cat.description && (
              <p className="text-sm text-gray-500 mt-1">
                {cat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
