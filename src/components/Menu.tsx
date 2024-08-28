"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={20}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
        {open && (
            <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-50">
                <Link href="/">Domů</Link>
                <Link href="/">Obchod</Link>
                <Link href="/">Blog</Link>
                <Link href="/">O nás</Link>
                <Link href="/">Kontakt</Link>
                {/* <Link href="/">Odhlásit se</Link>
                <Link href="/">Košík(1)</Link> */}
            </div>
        )}
    </div>
  );
};

export default Menu;
