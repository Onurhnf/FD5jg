import CategoryCard from "@/components/Category/CategoryCard.component";
import Header from "@/components/Header/Header.component";
import { IProduct } from "@/interfaces/Product/IProduct.interface";
import { ProductService } from "@/services/Product/Product.service";
import { setPrevProduct } from "@/store/PrevPageSlice";
import { RootState } from "@/store/Store";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function ViewAllPage({ product }: IProduct.IProductResponse) {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.prevPage);
  const dispatch = useDispatch();

  function handleCardClick(item: IProduct.IProductDetail): void {
    dispatch(setPrevProduct(item));
    router.push("/detail");
  }

  return (
    <>
      <div className="bg-white">
        {/* Header */}
        <Header />
        {/* Categories */}
        <div className="flex flex-row m-10 ">
          <button
            className="  text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => router.back()}
          >
            <img
              src="/LeftArrow.svg"
              alt="Left Arrow"
              className="w-7 h-7 mr-2"
            />
            <span>{data ?? "Back"}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-10 m-10">
          {product &&
            product.map((item, index) => (
              <div
                className="flex cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                <CategoryCard
                  author={item.author}
                  cover={item.cover}
                  name={item.name}
                  price={item.price.toString()}
                  viewAll
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const categoryId = context.params?.categoryId;
    console.log(categoryId);

    const result = await ProductService.GetProducts(categoryId as string);

    return {
      props: {
        product: result.data.product,
      },
    };
  } catch (error: any) {
    console.log("Err:", error);
    context.res.writeHead(302, { Location: "/" });
    context.res.end();

    return { props: {} };
  }
};
