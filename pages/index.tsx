import Category from "@/components/Category/Category.component";
import Header from "@/components/Header/Header.component";
import { ICategory } from "@/interfaces/Category/ICategory.interface";
import { CategoryService } from "@/services/Category/Category.service";
import { GetServerSidePropsContext } from "next";

export default function Home({ category }: ICategory.ICategoryResponse) {
  return (
    <div className="bg-white">
      {/* Header */}
      <Header />
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
