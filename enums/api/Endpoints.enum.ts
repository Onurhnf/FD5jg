export enum Endpoints {
  /**
   * authentication
   */
  Login = "https://assign-api.piton.com.tr/api/rest/login",
  Register = "https://assign-api.piton.com.tr/api/rest/register",

  /**
   * Categories
   */
  Categories = "https://assign-api.piton.com.tr/api/rest/categories",

  /**
   * Products
   */
  ProductsByCategoryId = "https://assign-api.piton.com.tr/api/rest/products/", // :id
  ProductCoverImage = "https://assign-api.piton.com.tr/api/rest/cover_image",
}
