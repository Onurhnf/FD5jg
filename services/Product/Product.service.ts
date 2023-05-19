import { Endpoints } from "@/enums/api/Endpoints.enum";
import Http from "@/utils/Http";
import { IProduct } from "@/interfaces/Product/IProduct.interface";

export const ProductService = {
  /**
   *
   * @param id category id
   * @returns products by category id
   */
  GetProducts: async (
    id: string
  ): Promise<{ data: IProduct.IProductResponse }> => {
    const result = await Http.GET(Endpoints.ProductsByCategoryId + id);
    return result;
  },

  /**
   *
   * @param fileName
   * @returns image
   */
  ProductCoverImage: async (
    fileName: string
  ): Promise<{ data: IProduct.ICoverImageResponse }> => {
    const result = await Http.POST(Endpoints.ProductCoverImage, { fileName });
    return result;
  },
};
