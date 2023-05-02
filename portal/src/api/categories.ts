import { CategoryResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategory(id: string): Promise<CategoryResponse> {
  try {
    const url = new URL(`/api/category/${id}`, API_URL);

    const response = await fetch(url.toString(), { method: "GET" });
    return response.json();
  } catch (error) {
    /** TODO:
     * here we should log the error using some external tool to have it tracked, like Sentry does
     * and then return a known error to be handled in the front component
     */
    throw new Error("");
  }
}
