import { ProductService } from "@/services/Product/Product.service";
import { RootState } from "@/store/Store";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BookDetail() {
  const product = useSelector((state: RootState) => state.prevPage.product);
  const router = useRouter();
  const [image, setImage] = useState<string>("/logo.svg");

  async function productCoverImage(filename: string) {
    try {
      const result = await ProductService.ProductCoverImage(filename);
      setImage(result.data.action_product_image.url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (product?.cover) {
      productCoverImage(product?.cover);
    }
  }, []);

  return (
    <>
      <div className="m-[60px] bg-white rounded-md px-2 py-3">
        <div className="flex flex-col justify-between h-full">
          {/* Back Button*/}
          <div className="flex flex-row my-2 ">
            <button
              className="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={() => router.back()}
            >
              <img
                src="/LeftArrow.svg"
                alt="Left Arrow"
                className="w-7 h-7 mr-2"
              />
              <span>{"Back"}</span>
            </button>
          </div>
          {/* Back Button*/}
          <div
            className="flex m-[10px] gap-20"
            style={{ width: "100%", height: "100%" }}
          >
            <div className=" bg-violet-50">
              <div
                className="w-2/5 m-14"
                style={{ width: "300px", height: "450px" }}
              >
                <Image
                  src={image}
                  width={300}
                  height={450}
                  alt={product?.name ?? "alt"}
                />
              </div>
            </div>

            <div className="w-3/5 px-2 py-4 flex flex-col">
              <div className="relative">
                <button
                  type="button"
                  className="text-white bg-violet-50 hover:bg-violet-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center  right-0 absolute"
                >
                  <img
                    src={"/heart.svg"}
                    alt="Heart Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <div>
                <h3 className="text-4xl font-semibold text-black">
                  {product?.name}
                </h3>
                <p className="text-gray-500 text-3xl font-semibold mt-[10px]">
                  {product?.author}
                </p>
              </div>
              <div className="mt-[60px]">
                <h3 className="text-xl font-bold text-black">Summary</h3>
                <p className="text-gray-500 text-sm font-semibold mt-[10px] text-justify">
                  {product?.description}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                className={`bg-MainOrange  hover:bg-opacity-90 text-white text-[24px] font-semibold  w-[300px] md:w-[400px] h-[60px] rounded-md right-0 bottom-0 absolute mr-20`}
              >
                <div className="flex flex-row gap-32 justify-center">
                  <p>{product?.price} $</p> <p>Buy Now</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
