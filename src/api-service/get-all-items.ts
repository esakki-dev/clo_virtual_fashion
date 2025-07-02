import type { CLOFashionItemTypes } from "../types/CLOFashionItemListTypes";

const HttpGet = function (url: string) {
    return fetch(url, { method: 'GET' }).then((response) => response.json());
}


export const GetCLOFashionItems = (url: string, callback: (result: CLOFashionItemTypes[]) => void) => {
    HttpGet(url).then((response) => callback(response));
}