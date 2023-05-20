import Header from "@/components/Header/Header.component";
import BookDetail from "@/components/Product/BookDetail.component";
import { useRouter } from "next/router";

export default function BookDetailPage() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen">
      {/*Header Detail*/}
      <Header />

      {/* Book Detail */}
      <BookDetail />
    </div>
  );
}
