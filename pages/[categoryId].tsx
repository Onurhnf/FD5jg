import CategoryCard from "@/components/Category/CategoryCard.component";
import Header from "@/components/Header/Header.component";
import { IProduct } from "@/interfaces/Product/IProduct.interface";
import { ProductService } from "@/services/Product/Product.service";
import { RootState } from "@/store/Store";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function ViewAllPage({ product }: IProduct.IProductResponse) {
  const router = useRouter();
  const { data }: any = useSelector((state: RootState) => state.prevPage.data);
  console.log();

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>

            <span>{data ?? "Back"}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-10 m-10">
          {product &&
            product.map((item, index) => (
              <div className="flex" key={index}>
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
