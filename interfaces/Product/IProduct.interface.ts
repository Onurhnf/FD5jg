export namespace IProduct {
  interface IAggregate {
    count: number;
  }

  interface ILikes_aggregate {
    aggregate: IAggregate;
  }

  export interface IProductDetail {
    author: string;
    cover: string;
    created_at: string;
    description: string;
    id: number;
    name: string;
    price: number;
    sales: number;
    slug: string;
    likes_aggregate: ILikes_aggregate;
  }

  export interface IProductResponse {
    product: IProductDetail[];
  }
  interface IAction_product_image {
    url: string;
  }

  export interface ICoverImageResponse {
    action_product_image: IAction_product_image;
  }
}
