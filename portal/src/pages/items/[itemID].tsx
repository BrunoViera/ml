import { getCategory } from "@/api/categories";
import { getItem } from "@/api/items";
import Categories from "@/components/Categories";
import DetailItem from "@/components/Item/DetailItem";
import Loader from "@/components/Layout/Loader";
import { Item } from "@/types/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Item() {
  const router = useRouter();
  const { itemID } = router.query;
  const [item, setItem] = useState<Item | undefined>();
  const [cats, setCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getViewData = useCallback(async () => {
    if (!itemID) return;
    const itemResponse = await getItem(itemID.toString());
    setItem(itemResponse.item);

    if (itemResponse.item) {
      const catResponse = await getCategory(itemResponse.item?.category_id);
      setCats(catResponse.categoryPath);
    }

    setLoading(false);
  }, [itemID]);

  useEffect(() => {
    getViewData();
  }, [itemID]);

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : item ? (
        <>
          <Categories categories={cats} />
          <DetailItem item={item} />
        </>
      ) : (
        <p>Ups, no encontramos el producto</p>
      )}
    </div>
  );
}
