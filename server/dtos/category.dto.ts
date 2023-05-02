import { Expose } from "class-transformer";

export default class CategoryDto {
  @Expose() id!: string;

  @Expose() name!: string;

  @Expose() path_from_root!: CategoryDto[];

  getPath() {
    return this.path_from_root.map((c) => c.name);
  }
}
