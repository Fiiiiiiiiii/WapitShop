import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      if (!cart) {
        console.error("Košík nenalezen.");
        console.log("Košík nenalezen.");
        return;
      }
      set({
        cart: cart,
        isLoading: false,
        counter: cart.lineItems.length,
      });
    } catch (error) {
      console.error("Chyba při získávání košíku:", error);
      set({ isLoading: false });
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });
  
      if (!response || !response.cart) {
        throw new Error("Přidání do košíku selhalo.");
      }
  
      set({
        cart: response.cart,
        counter: response.cart.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      console.error("Chyba při přidávání položky do košíku:", error);
      set({ isLoading: false });
    }
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
  
      if (!response || !response.cart) {
        throw new Error("Odstranění položky z košíku selhalo.");
      }
  
      set({
        cart: response.cart,
        counter: response.cart.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      console.error("Chyba při odstraňování položky z košíku:", error);
      set({ isLoading: false });
    }
  },
}));


//původní kód
// import { create } from "zustand";
// import { currentCart } from "@wix/ecom";
// import { WixClient } from "@/context/wixContext";

// type CartState = {
//   cart: currentCart.Cart;
//   isLoading: boolean;
//   counter: number;
//   getCart: (wixClient: WixClient) => void;
//   addItem: (
//     wixClient: WixClient,
//     productId: string,
//     variantId: string,
//     quantity: number
//   ) => void;
//   removeItem: (wixClient: WixClient, itemId: string) => void;
// };

// export const useCartStore = create<CartState>((set) => ({
//   cart: [],
//   isLoading: true,
//   counter: 0,
//   getCart: async (wixClient) => {
//     const cart = await wixClient.currentCart.getCurrentCart();
//     set({
//       cart: cart || [],
//       isLoading: false,
//       counter: cart?.lineItems.length || 0,
//     });
//   },
//   addItem: async (wixClient, productId, variantId, quantity) => {
//     set((state) => ({ ...state, isLoading: true }));
//     const response = await wixClient.currentCart.addToCurrentCart({
//       lineItems: [
//         {
//           catalogReference: {
//             appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
//             catalogItemId: productId,
//             ...(variantId && { options: { variantId } }),
//           },
//           quantity: quantity,
//         },
//       ],
//     });

//     set({
//       cart: response.cart,
//       counter: response.cart?.lineItems.length,
//       isLoading: false,
//     });
//   },
//   removeItem: async (wixClient, itemId) => {
//     set((state) => ({ ...state, isLoading: true }));
//     const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
//       [itemId]
//     );

//     set({
//       cart: response.cart,
//       counter: response.cart?.lineItems.length,
//       isLoading: false,
//     });
//   },
// }));
