import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-cyan-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/5 flex flex-col items-center justify-center gap-8">
          <h1 className="text-3xl pl-6 font-bold leading-[48px] text-gray-700">
            Vytvoř si vlastní síť. <br />Vybuduj ji podle svých představ!
          </h1>
          {/* <button className="rounded-3xl bg-wapit text-white w-max py-3 px-5 text-sm">
            Nakoupit
          </button> */}
        </div>
        <div className="relative w-3/5">
          <Image
            src="/listMain.png"
            alt="listImage"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">{cat.collection?.name}</h1>
      <Suspense fallback={"loading"}>
        <ProductList
          categoryId={
            cat.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
