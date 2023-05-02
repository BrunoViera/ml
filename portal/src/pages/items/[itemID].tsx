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
  const [loading, setLoading] = useState(true);

  const getItemData = useCallback(async () => {
    if (!itemID) return;
    const response = await getItem(itemID.toString());
    setItem(response.item);

    setLoading(false);
  }, [itemID]);

  useEffect(() => {
    getItemData();
  }, [itemID]);

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : item ? (
        <>
          <Categories categoryId={item.category_id} />
          <DetailItem item={item} />
        </>
      ) : (
        <p>Ups, no encontramos el producto</p>
      )}
    </div>
  );
}
