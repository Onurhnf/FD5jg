import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "@/components/Header/Header.component";
import BookDetail from "@/components/Product/BookDetail.component";
import { RootState } from "@/store/Store";

export default function BookDetailPage() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("pitonToken")) {
      router.push("/auth");
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/*Header Detail*/}
      <Header />

      {/* Book Detail */}
      <BookDetail />
    </div>
  );
}
