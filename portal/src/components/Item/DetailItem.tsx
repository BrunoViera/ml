import { Item } from "@/types/types";
import { getCondition } from "@/utils/condition";
import { getPrintablePrice } from "@/utils/price";
import Image from "next/image";

export default function DetailItem({ item }: { item: Item }) {
  return (
    <div className="item__container">
      <div className="item__container-detail">
        <div className="item__detail">
          <div className="item__detail-main">
            {item.picture ? (
              <Image
                className="item__image"
                src={item.picture}
                height={680}
                width={680}
                alt=""
              />
            ) : (
              <p>No hay imagen</p>
            )}
            <p className="description__title">Descripción del producto</p>
            <p className="description__text">{item.description}</p>
          </div>
          <div className="item__detail-info">
            <p className="info__state">
              {getCondition(item.condition)} - {item.sold_quantity} vendidos
            </p>
            <p className="info__title">{item.title}</p>
            <div className="info_price">{getPrintablePrice(item.price)}</div>
            <button className="button__buy">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
