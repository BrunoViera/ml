import { Request, Response } from "express";
import categoryService from "../../services/category.service";

async function getCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  let category;
  try {
    if (categoryId) {
      category = await categoryService.getCategory(categoryId);
    }

    res.json({ categoryPath: category ? category.getPath() : [] });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Oops, something wrong happened here :/" });
  }
}

export default Object.freeze({
  getCategory,
});
