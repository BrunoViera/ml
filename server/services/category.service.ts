import { plainToClass } from "class-transformer";
import CategoryDto from "../dtos/category.dto";
import { Category } from "../types";
import { getExternalApiURL } from "../utils/envVars";

async function getCategory(categoryId: string): Promise<Category | undefined> {
  if (!getExternalApiURL()) {
    throw new Error("Bad configuration settings");
  }

  const url = new URL(`categories/${categoryId}`, getExternalApiURL());
  let result, response;

  try {
    result = await fetch(url.toString(), { method: "GET" });
    response = await result.json();
  } catch (error) {
    throw new Error("Error with external connection");
  }

  try {
    if (response) {
      return plainToClass(CategoryDto, response, {
        excludeExtraneousValues: true,
      });
    }

    return;
  } catch (error) {
    throw new Error("Error parsing item");
  }
}

export default Object.freeze({
  getCategory,
});
