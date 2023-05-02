import { plainToClass } from "class-transformer";
import CategoryDto from "../dtos/category.dto";
import ItemDetailDto from "../dtos/item.detail.dto";
import ItemListDto from "../dtos/item.list.dto";
import { Category, ListItem } from "../types";
import { getExternalApiURL, getExternalSearchURL } from "../utils/envVars";

const ITEMS_LIMIT = "4";

async function searchItems(
  searchBy: string | undefined
): Promise<Record<string, ListItem[] | string[]>> {
  if (!getExternalSearchURL()) {
    throw new Error("Bad configuration settings");
  }

  let categories: string[] = [];
  let items: ListItem[] = [];

  if (!searchBy) {
    return { items, categories };
  }

  try {
    const url = new URL("search", getExternalSearchURL());

    url.searchParams.append("q", searchBy);
    url.searchParams.append("limit", ITEMS_LIMIT);

    const response = await fetch(url.toString(), { method: "GET" });
    const body = await response.json();
    const categoryFilter = body.filters.find(
      (item: any) => (item.id = "category")
    );

    if (categoryFilter && categoryFilter.values[0]) {
      const category: Category = plainToClass(
        CategoryDto,
        categoryFilter.values[0],
        {
          excludeExtraneousValues: true,
        }
      );

      categories = category.getPath();
    }

    try {
      items = body.results.map((i: unknown) =>
        plainToClass(ItemListDto, i, { excludeExtraneousValues: true })
      );
    } catch (error) {
      throw new Error("Error parsing item");
    }
    return { items, categories };
  } catch (error) {
    throw new Error("Error with external connection");
  }
}

async function getItem(itemId: string) {
  if (!getExternalApiURL()) {
    throw new Error("Bad configuration settings");
  }

  const urlItem = new URL(`items/${itemId}`, getExternalApiURL());
  const urlDescription = new URL(
    `items/${itemId}/description`,
    getExternalApiURL()
  );

  let results, itemAPI, descriptionAPI;

  try {
    results = await Promise.all([
      fetch(urlItem.toString(), { method: "GET" }),
      fetch(urlDescription.toString(), { method: "GET" }),
    ]);

    itemAPI = await results[0].json();
    descriptionAPI = await results[1].json();
  } catch (error) {
    throw new Error("Error with external connection");
  }

  try {
    let item = {};
    if (itemAPI && descriptionAPI) {
      item = plainToClass(
        ItemDetailDto,
        { ...itemAPI, ...descriptionAPI },
        { excludeExtraneousValues: true }
      );
    }

    return item;
  } catch (error) {
    throw new Error("Error parsing item");
  }
}

export default Object.freeze({
  getItem,
  searchItems,
});
