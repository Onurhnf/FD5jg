import { ICategory } from "@/interfaces/Category/ICategory.interface";
import { ProductService } from "@/services/Product/Product.service";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/Product/IProduct.interface";
import CategoryCard from "./CategoryCard.component";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setPrevName, setPrevProduct } from "@/store/PrevPageSlice";
import { useRouter } from "next/router";

export default function Category({
  created_at,
  id,
  name,
}: ICategory.ICategoryDetail) {
  const [product, setProduct] = useState<IProduct.IProductDetail[]>();
  const dispatch = useDispatch();
  const router = useRouter();
  async function productDetail(id: string) {
    try {
      const result = await ProductService.GetProducts(id);
      setProduct(result.data.product);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productDetail(id.toString());
  }, []);

  function handleCardClick(item: IProduct.IProductDetail): void {
    dispatch(setPrevProduct(item));
    router.push("/detail");
  }

  return (
    <section className=" mx-20 py-8 drop-shadow-xl">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        <Link href={id.toString()}>
          <button
            onClick={() => {
              dispatch(setPrevName(name));
            }}
            className="text-MainOrange text-2xl font-semibold"
          >
            View all
          </button>
        </Link>
      </div>
      <div
        className="flex flex-row overflow-clip gap-4"
        style={{ maxWidth: "100%" }}
      >
        {product &&
          product.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <CategoryCard
                author={item.author}
                cover={item.cover}
                name={item.name}
                price={item.price.toString()}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
