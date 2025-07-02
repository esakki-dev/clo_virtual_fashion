import { createSlice } from "@reduxjs/toolkit";
import type { CLOFashionItemTypes } from "../types/CLOFashionItemListTypes";
import type { PricingTypes } from "../types/PricingTypes";
import { CloItemSearchFilter } from "../utils/global.helpers";


const CloItemsSlice = createSlice({
    name: 'CLO_ITEMS',
    initialState: {
        searchCloItem: "",
        cloItems: [] as CLOFashionItemTypes[],
        cloFilterItems: [] as CLOFashionItemTypes[]
    },
    reducers: {
        setSearchCloItem: (state, actions) => {
            state.searchCloItem = actions.payload;
        },
        allClodItems: (state, actions) => {
            state.cloItems = actions.payload;
            state.cloFilterItems = actions.payload
        },
        priceFilterCloItems: (state, actions) => {

            const isFilterChecked = actions.payload.some((item: PricingTypes) => item.checked);
            const hasSearchQuery = !!state.searchCloItem?.length;

            if (!isFilterChecked && !hasSearchQuery) {
                state.cloFilterItems = state.cloItems;
            } else {
                let filteredItems = [...state.cloItems];

                if (isFilterChecked) {
                    const selectedValues = actions.payload
                        .filter((item: PricingTypes) => item.checked)
                        .map((item: PricingTypes) => item.value);

                    filteredItems = filteredItems.filter((item) =>
                        selectedValues.includes(item.pricingOption)
                    );
                }

                if (hasSearchQuery) {
                    filteredItems = CloItemSearchFilter(filteredItems, state.searchCloItem);
                }

                state.cloFilterItems = filteredItems;
            }
        },
        searchFilterCloItems: (state, actions) => {
            state.cloFilterItems = CloItemSearchFilter(state.cloItems, actions.payload)
        }
    }
})

export const { allClodItems, priceFilterCloItems, searchFilterCloItems, setSearchCloItem } = CloItemsSlice.actions;
export const cloItemsReducer = CloItemsSlice.reducer;
