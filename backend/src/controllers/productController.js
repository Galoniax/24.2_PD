import { ProductService } from "../services/productService.js";

export class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.getById({ id });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    const product = req.body;

    try {
      const newProduct = await ProductService.create({ product });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.getById({ id });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      const updatedData = {
        name: req.body.name ?? existingProduct.name,
        description: req.body.description ?? existingProduct.description,
        price: req.body.price ?? existingProduct.price,
        imageURL: req.body.imageURL ?? existingProduct.imageURL,
        stock: req.body.stock ?? existingProduct.stock,
        categoryId: req.body.categoryId ?? existingProduct.categoryId,
        subcategoryId: req.body.subcategoryId ?? existingProduct.subcategoryId,
        status: req.body.stock == 0 || (req.body.stock === undefined && existingProduct.stock == 0) 
          ? "agotado" 
          : "disponible"
      };
  
      await ProductService.update({ id, product: updatedData });

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.getById({ id });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      await ProductService.delete({ id });

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
