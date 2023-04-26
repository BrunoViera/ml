import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import ItemDetailDto from "../../dtos/item.detail.dto";
import ItemListDto from "../../dtos/item.list.dto";

const EXTERNAL_SEARCH_URL = process.env.EXTERNAL_SEARCH_URL;
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
const ITEMS_LIMIT = "4";

async function getItems(req: Request, res: Response, next: NextFunction) {
  if (!EXTERNAL_SEARCH_URL) {
    return res.status(500).json({ message: "Bad configuration settings" });
  }

  const searchBy: string | undefined = req.query.q?.toString();
  if (!searchBy) {
    return res.json({ items: [] });
  }

  let firstCategoryId;
  let categories = [];
  let items = [];

  try {
    const url = new URL("search", EXTERNAL_SEARCH_URL);

    url.searchParams.append("q", searchBy);
    url.searchParams.append("limit", ITEMS_LIMIT);

    const response = await fetch(url.toString(), { method: "GET" });
    const body = await response.json();
    firstCategoryId = body.results?.[0].category_id;

    items = body.results.map((i: unknown) =>
      plainToClass(ItemListDto, i, { excludeExtraneousValues: true })
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error with external connection, items" });
  }

  try {
    const urlCategory = new URL(
      `categories/${firstCategoryId}`,
      EXTERNAL_API_URL
    );

    const responseCategory = await fetch(urlCategory.toString(), {
      method: "GET",
    });
    const bodyCategory = await responseCategory.json();
    categories = bodyCategory.path_from_root.map(
      (c: Record<string, string>) => c.name
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error with external connection, categories" });
  }

  res.json({ categories, items });
}

async function getItem(req: Request, res: Response) {
  if (!EXTERNAL_API_URL) {
    return res.status(500).json({ message: "Bad configuration settings" });
  }
  const { itemId } = req.params;

  const urlItem = new URL(`items/${itemId}`, EXTERNAL_API_URL);
  const urlDescription = new URL(
    `items/${itemId}/description`,
    EXTERNAL_API_URL
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
    return res.status(500).json({ message: "Error with external connection" });
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

    res.json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Error parsing item" });
  }
}

export default Object.freeze({
  getItem,
  getItems,
});
