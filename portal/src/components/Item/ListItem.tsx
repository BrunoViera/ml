import { ListItem } from "@/types/types";
import { getPrintablePrice } from "@/utils/price";
import Image from "next/image";
import Link from "next/link";
import FreeShippingIcon from "../icons/Shipping";

export default function ListItem({ item }: { item: ListItem }) {
  return (
    <Link className="item__list" href={`/items/${item.id}`} target="_blank">
      <Image
        className="item__list-image"
        src={item?.picture}
        height={180}
        width={180}
        alt="item image"
      />
      <div className="item__list-content">
        <p className="item__list-content-price">
          {getPrintablePrice(item.price)}
          {item.free_shipping ? <FreeShippingIcon /> : null}
        </p>
        <p className="item__list-content-title">{item.title}</p>
      </div>
      <div className="item__list-location">{item.state_name}</div>
    </Link>
  );
}
