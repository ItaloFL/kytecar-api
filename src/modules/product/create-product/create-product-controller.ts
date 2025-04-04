import { Request, Response } from "express";
import { convertToNumber } from "../../../utils/convertToNumber";
import { MakeCreateProductUseCase } from "../../../factories/make-create-product-use-case";
import 'dotenv/config'


export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, details } = request.body;
    const imageProduct = request.file!;

    const priceNumber = convertToNumber(price);

    const createProductUseCase = MakeCreateProductUseCase();

    const product = await createProductUseCase.execute({
      name,
      price: priceNumber,
      yearCar,
      details,
      brand,
      imageURL: imageProduct.path,
    });

    return response.json(product);
  }
}
