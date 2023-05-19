import { ICategory } from "@/interfaces/Category/ICategory.interface";
import { ProductService } from "@/services/Product/Product.service";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CategoryCardProps extends ICategory.ICategoryCard {
  viewAll?: boolean;
}

export default function CategoryCard({
  cover,
  author,
  name,
  price,
  viewAll = false,
}: CategoryCardProps) {
  const [image, setImage] = useState<string>("");

  async function productCoverImage(filename: string) {
    try {
      const result = await ProductService.ProductCoverImage(filename);
      setImage(result.data.action_product_image.url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productCoverImage(cover);
  }, []);

  return (
    <div
      className={`${
        viewAll ? "w-[300px] h-[433px]" : "w-[320px] h-[200px]"
      } bg-gray-200 rounded-md px-2 py-3`}
    >
      <div className="flex flex-col justify-between h-full">
        {viewAll ? (
          <div className="flex justify-center w-full h-4/5">
            <Image
              src={image}
              width={200}
              height={300}
              alt={name}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className="flex m-[10px]"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="w-2/5" style={{ width: "120px" }}>
              <Image
                src={image}
                width={120}
                height={180}
                alt={name}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  marginTop: "4px",
                }}
              />
            </div>
            <div className="w-3/5 px-2 py-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-black">{name}</h3>
                <p className="text-gray-500 text-sm font-semibold">{author}</p>
              </div>
              <div>
                <p className="text-purple-600 font-bold text-xl">{price} $</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row justify-between h-1/5 px-2 py-4">
          <div>
            <h3 className="text-xl font-bold text-black">{name}</h3>
            <p className="text-gray-500 text-sm font-semibold">{author}</p>
          </div>
          <div className={`${viewAll ? "min-w-fit mx-3" : ""}`}>
            <p className="text-purple-600 font-bold text-xl">{price} $</p>
          </div>
        </div>
      </div>
    </div>
  );
}
