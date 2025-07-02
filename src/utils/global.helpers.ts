import type { CLOFashionItemTypes } from "../types/CLOFashionItemListTypes";

export function CloItemSearchFilter(data: CLOFashionItemTypes[], searchItem: string): CLOFashionItemTypes[] {
  if (!searchItem) return data;

  const regex = new RegExp(searchItem, 'i');

  return data.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' || typeof value === 'number'
        ? regex.test(String(value))
        : false
    )
  );
}