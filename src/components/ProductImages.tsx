"use client";

import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/26690031/pexels-photo-26690031/free-photo-of-priroda-ptak-rock-kamen.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/26691734/pexels-photo-26691734/free-photo-of-plavani-podvodni-meduza-fotografovani-zvirat.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/26841354/pexels-photo-26841354/free-photo-of-krajina-priroda-ptak-zvire.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/26690287/pexels-photo-26690287/free-photo-of-more-priroda-trava-ptaci.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
// ];

const ProductImages = ({items}:{items:any}) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt="Product Images"
          fill
          sizes="50vw"
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-2">
        {items.map((item:any, i:number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt="Product Images"
              fill
              sizes="30vw"
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
