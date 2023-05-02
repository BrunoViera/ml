import { Request, Response } from "express";
import itemService from "../../services/item.service";

async function getItems(req: Request, res: Response) {
  try {
    const searchBy: string | undefined = req.query.q?.toString();
    const searchResult = await itemService.searchItems(searchBy);

    res.json(searchResult);
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
