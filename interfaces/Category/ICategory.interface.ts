export namespace ICategory {
  export interface ICategoryDetail {
    id: number;
    name: string;
    created_at: string;
  }

  export interface ICategoryResponse {
    category: ICategoryDetail[];
  }

  export interface ICategoryCard {
    author: string;
    cover: string;
    name: string;
    price: string;
  }
}
