import { searchItems } from "@/api/items";
import Categories from "@/components/Categories";
import ListItem from "@/components/Item/ListItem";
import Loader from "@/components/Layout/Loader";
import { ListItem as ListItemI } from "@/types/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Items() {
  const router = useRouter();
  const [items, setItems] = useState<ListItemI[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getItems = useCallback(async () => {
    if (!router.query.q) return;
    const response = await searchItems(router.query.q.toString());

    setItems(response.items);
    setCats(response.categories);
    setLoading(false);
  }, [router.query]);

  useEffect(() => {
    setLoading(true);
    getItems();
  }, [router.query]);

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Categories categories={cats} />

          <div className="item__container">
            <div className="item__container-list">
              {items.map((i) => (
                <ListItem key={i.id} item={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
