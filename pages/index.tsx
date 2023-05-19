import Category from "@/components/Category/Category.component";
import { ICategory } from "@/interfaces/Category/ICategory.interface";
import { CategoryService } from "@/services/Category/Category.service";
import { ProductService } from "@/services/Product/Product.service";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useEffect } from "react";

export default function Home({ category }: ICategory.ICategoryResponse) {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Image"
            width={60}
            height={39}
            className="object-cover"
          />
        </div>

        <div className="flex justify-center flex-grow px-28">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full "
          />
        </div>

        <button className="px-4 py-2 text-white bg-red-500 rounded-md">
          Logout
        </button>
      </header>

      <div className="h-64 bg-cover bg-center bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to our Website</h2>
          <p className="text-xl">Discover amazing categories and more!</p>
        </div>
      </div>

      {/* Categories */}
      {category.map((item) => {
        return <Category key={item.id} {...item} />;
      })}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const result = await CategoryService.GetCategories();

    const props: ICategory.ICategoryResponse = {
      category: result.data.category,
    };

    return {
      props: {
        ...props,
      },
    };
  } catch (error: any) {
    console.log("Err:", error);
    context.res.writeHead(302, { Location: "/" });
    context.res.end();

    return { props: {} };
  }
}
