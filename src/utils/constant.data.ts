import type { PricingTypes } from "../types/PricingTypes";

export const PricingData: PricingTypes[] = [
    {
        name: "Paid",
        checked: false,
        value: 0
    },
    {
        name: "Free",
        checked: false,
        value: 1
    },
    {
        name: "View Only",
        checked: false,
        value: 2
    },
];

export const PricingObject: { [key: number]: string } = {
    0: "PAID",
    1: "FREE",
    2: "View Only"
} as const

