import { getCategory } from "@/api/categories";
import { useCallback, useEffect, useState } from "react";

export default function Categories({ categoryId }: { categoryId: string }) {
  const [categories, setCategories] = useState<string[]>([]);

  const getCategoryData = useCallback(async () => {
    if (!categoryId) return;
    const response = await getCategory(categoryId);
    setCategories(response.categoryPath);
    console.log(response);
  }, [categoryId]);

  useEffect(() => {
    getCategoryData();
  }, [categoryId]);
  return (
    <div className="categories">
      {categories.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  );
}
