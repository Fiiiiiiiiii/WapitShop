"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {

  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  return (
    <button
        onClick={() => addItem(wixClient, productId, variantId, stockNumber)}
        disabled={isLoading}
        className=" text-xs rounded-2xl ring-1 ring-white text-white bg-wapit py-2 px-4 disabled:cursor-not-allowed disabled:bg-sky-200 disabled:ring-0 disabled:text-white disabled:ring-none hover:bg-green-300 hover:text-black hover:shadow-2xl hover:shadow-lime-400 transition"
    >
        Přidat do košíku
    </button>
  );
};

export default Add;
