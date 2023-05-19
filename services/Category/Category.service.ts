import { Endpoints } from "@/enums/api/Endpoints.enum";
import Http from "@/utils/Http";
import { ICategory } from "@/interfaces/Category/ICategory.interface";

export const CategoryService = {
  /**
   * @returns Categories
   */
  GetCategories: async (): Promise<{ data: ICategory.ICategoryResponse }> => {
    const result = await Http.GET(Endpoints.Categories);
    return result;
  },
};
