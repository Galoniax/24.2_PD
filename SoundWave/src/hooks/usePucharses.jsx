import { createPurchase, fetchAllPurchases } from "../services/pucharseService";

export const usePucharses = () => {
    return { createPurchase, fetchAllPurchases };
};