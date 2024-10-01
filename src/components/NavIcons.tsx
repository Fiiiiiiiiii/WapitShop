"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CartModel from "./CartModel";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };
  
  
  // přihlášení přes wix clienta
  
  // const wixClient = useWixClient();
  
  // const login = async () => {
    //   const loginRequestData = wixClient.auth.generateOAuthData(
      //     "http://localhost:3000"
      //   );
      
  //   console.log(loginRequestData);

  //   localStorage.setItem("OAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };
  
  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };
  
  // timer pro zavření košíku
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Pokud už je nastaven timeout, zrušíme ho
    }
    setIsCartOpen(true); // Otevře se košík
  };
  const handleMouseLeave = () => {
    // Nastavíme timeout, který zavře košík po 500ms
    timeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 500);
  };
  
  const { cart, counter, getCart } = useCartStore();
  
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);
  
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="profile"
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute w-28 p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profil</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Odhlášení" : "Odhlásit se"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="notification"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative"
        onMouseEnter={handleMouseEnter} // Pokud na košík najede, neuzavře se
        onMouseLeave={handleMouseLeave} // Pokud ho opustí, spustí se timeout
      >
        <Image
          src="/cart.png"
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer"
        />
        {counter === 0 ? "" : <div className="absolute -top-4 -right-4 w-6 h-6 bg-wapit rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>}
        {isCartOpen && <CartModel setIsCartOpen={setIsCartOpen}/>}
      </div>
    </div>
  );
};

export default NavIcons;
