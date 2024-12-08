import { PurchaseService } from "../services/pucharseService.js";

export class PucharseController {
    static async getAllPurchases(req, res) {
        try {
            const { user } = req;
            const purchases = await PurchaseService.getAll({ user });
             
            res.json(purchases);
        } catch (error) {
            console.error("Error al obtener las compras:", error);
            res.status(500).json({ error: "Error al obtener las compras." });
        }
    }

    static async createPurchase(req, res) {
        try {
            const purchase = req.body;
            const newPurchase = await PurchaseService.create({ purchase });
            
            res.status(201).json(newPurchase);
        } catch (error) {
            console.error("Error al crear la compra:", error);
            res.status(500).json({ error: "Error al crear la compra." });
        }
    }
}