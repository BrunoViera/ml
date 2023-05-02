import { ListItem } from "@/types/types";
import { getPriceLocale } from "@/utils/price";
import Image from "next/image";
import Link from "next/link";

export default function ListItem({ item }: { item: ListItem }) {
  const price = (item.price.amount + item.price.decimals).toLocaleString(
    getPriceLocale(item.price.currency)
  );

  return (
    <Link className="item__list" href={`/items/${item.id}`}>
      <Image
        className="item__list-image"
        src={item?.picture}
        height={180}
        width={180}
        alt=""
      />
      <div className="item__list-content">
        <p className="item__list-content-price">$ {price}</p>
        <p className="item__list-content-title">{item.title}</p>
      </div>
      <div className="item__list-location">{item.state_name}</div>
    </Link>
  );
}
