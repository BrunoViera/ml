import { Expose, Transform } from "class-transformer";

export default class PriceDto {
  @Expose({ name: "currency_id" })
  currency!: string;

  @Expose({ name: "price" })
  @Transform(({ value }) => parseInt(`${value}`.split(".")[0]), {
    toClassOnly: true,
  })
  amount!: number;

  @Expose()
  @Transform(
    ({ obj }) => {
      return parseFloat(`0.${`${obj.price}`.split(".")[1]}`);
    },
    {
      toClassOnly: true,
    }
  )
  decimals!: number;
}
