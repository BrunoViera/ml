import { plainToClass } from "class-transformer";
import CategoryDto from "../dtos/category.dto";
import { getExternalApiURL } from "../utils/envVars";

async function getCategory(categoryId: string) {
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
    let category = {};
    if (response) {
      category = plainToClass(CategoryDto, response, {
        excludeExtraneousValues: true,
      });
    }

    return category;
  } catch (error) {
    console.log("concha", error);

    throw new Error("Error parsing item");
  }
}

export default Object.freeze({
  getCategory,
});
