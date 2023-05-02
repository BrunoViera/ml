import { Expose, Transform, plainToClass } from "class-transformer";
import PriceDTO from "./price.dto";

export default class ItemDetailDto {
  @Expose() id!: string;

  @Expose() title!: string;

  @Expose() condition!: string;

  @Expose() category_id!: string;

  @Expose()
  @Transform(({ obj }) => obj.pictures[0]?.url, {
    toClassOnly: true,
  })
  picture!: string;

  @Expose({ name: "" }) sold_quantity!: number;

  @Expose({ name: "plain_text" }) description!: string;

  @Expose()
  @Transform(({ obj }) => obj.shipping.free_shipping, {
    toClassOnly: true,
  })
  free_shipping!: boolean;

  @Expose()
  @Transform(({ obj }) =>
    plainToClass(PriceDTO, obj, { excludeExtraneousValues: true })
  )
  price!: PriceDTO;
}
