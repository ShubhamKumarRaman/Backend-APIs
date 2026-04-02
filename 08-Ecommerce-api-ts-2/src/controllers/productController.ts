import type { Request, Response } from "express";
import Product from "../models/Product.js";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.json(product);
}