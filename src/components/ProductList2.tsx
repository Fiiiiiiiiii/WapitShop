import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import AddSingle from "./AddSingle";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 99999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );
  // .find();

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <div key={product._id} className="w-full flex flex-col justify-between gap-4 sm:w-[45%] lg:w-[22%]">
          <Link
            href={"/" + product.slug}
            className=""
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt="test"
                fill
                sizes="25vw"
                className="absolute object-contain rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt="test"
                  fill
                  sizes="25vw"
                  className="absolute object-contain rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between ">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">{product.priceData?.price},-</span>
            </div>
            {product.additionalInfoSections && (
              // <div
              //   className="text-sm text-gray-500"
              //   dangerouslySetInnerHTML={{
              //     __html: DOMPurify.sanitize(
              //       product.additionalInfoSections.find(
              //         (section: any) => section.title === "shortDesc"
              //       )?.description || ""
              //     ),
              //   }}
              // ></div>
              <p
                className="text-gray-500 line-clamp-6 mt-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description || ""),
                }}
              ></p>
            )}
          </Link>
          <div className="flex justify-between">
            <button className="rounded-2xl ring-1 ring-wapit text-wapit w-max py-2 px-4 text-xs hover:bg-wapit hover:text-white transition">
              Více
            </button>
            <AddSingle
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={1}
            />
          </div>
        </div>
      ))}
      {/* <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      /> */}
    </div>
  );
};

export default ProductList;
