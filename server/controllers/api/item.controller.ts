import { Request, Response } from "express";
import categoryService from "../../services/category.service";
import itemService from "../../services/item.service";

async function getItems(req: Request, res: Response) {
  try {
    const searchBy: string | undefined = req.query.q?.toString();
    const items = await itemService.getItems(searchBy);

    const cats: Record<string, number> = {};
    let catId,
      highestValue = 0;
    items.forEach((i) => {
      if (!cats[i.category_id]) {
        cats[i.category_id] = 1;
      } else {
        cats[i.category_id] = cats[i.category_id] + 1;
      }

      if (cats[i.category_id] > highestValue) {
        catId = i.category_id;
      }
    });

    const category = catId ? await categoryService.getCategory(catId) : null;
    const categories = category ? category.getPath() : [];

    res.json({ categories, items });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Oops, something wrong happened here :/" });
  }
}

async function getItem(req: Request, res: Response) {
  try {
    const { itemId } = req.params;
    const item = await itemService.getItem(itemId);
    res.json({ item });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Oops, something wrong happened here :/" });
  }
}

export default Object.freeze({
  getItem,
  getItems,
});
