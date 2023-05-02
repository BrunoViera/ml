import { ItemsResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchItems(query: string): Promise<ItemsResponse> {
  try {
    const url = new URL("/api/items", API_URL);
    url.searchParams.append("q", query);

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

export async function getItem(id: string) {
  try {
    const url = new URL(`/api/items/${id}`, API_URL);

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
