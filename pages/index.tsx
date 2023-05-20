import Category from "@/components/Category/Category.component";
import Header from "@/components/Header/Header.component";
import { ICategory } from "@/interfaces/Category/ICategory.interface";
import { CategoryService } from "@/services/Category/Category.service";
import { removePrev } from "@/store/PrevPageSlice";
import { RootState } from "@/store/Store";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ category }: ICategory.ICategoryResponse) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(removePrev());
    if (!isLoggedIn) {
      router.push("/auth");
    }
    console.log("saaaaaa", isLoggedIn);
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />
      {/* Courosel */}

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
