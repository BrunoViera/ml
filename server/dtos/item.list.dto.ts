import { Expose, Transform, plainToClass } from "class-transformer";
import PriceDTO from "./price.dto";

export default class ItemListDto {
  @Expose() id!: string;

  @Expose() title!: string;

  @Expose() condition!: string;

  @Expose({ name: "thumbnail" }) picture!: string;

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
