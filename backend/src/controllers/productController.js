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

      const {
        name,
        description,
        price,
        imageURL,
        stock,
        categoryId,
        subcategoryId,
      } = req.body;

      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.imageURL = imageURL ?? product.imageURL;
      product.stock = stock ?? product.stock;
      product.categoryId = categoryId ?? product.categoryId;
      product.subcategoryId = subcategoryId ?? product.subcategoryId;

      /*if (product.stock == 0) {
        product.status = "Agotado";
      } else {
        product.status = "Disponible"; // Optional: reset status when stock > 0
      }*/

      await ProductService.update({ id, product });

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
