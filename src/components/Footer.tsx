import Link from "next/link";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-60 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">Wapit</div>
          </Link>
          <p>
            Krejčíkova 2015/2, Východní Předměstí Plzeň 2-Slovany, 326 00 Plzeň
          </p>
          <span className="font-semibold flex gap-2">
            <MdOutlineAlternateEmail />
            info@wapit.cz
          </span>
          <span className="font-semibold flex gap-2">
            <BsFillTelephoneFill />
            731 276 815
          </span>
          <div className="flex gap-6">
            <Link href="https://www.instagram.com/wapit.cz" target="_blank">
              <FaInstagram className="text-lg duration-500 hover:text-[#C13584] hover:duration-500 hover:translate-y-[-5px]"/>
            </Link>
            <Link
              href="https://www.facebook.com/people/Wapitcz/61561553063464/"
              target="_blank"
            >
              <FaFacebook className="text-lg duration-500 hover:text-[#0674a0] hover:duration-500 hover:translate-y-[-5px]"/>
            </Link>
            <Link href="https://cz.linkedin.com/" target="_blank">
              <FaLinkedinIn className="text-lg duration-500 hover:text-[#0a66c2] hover:duration-500 hover:translate-y-[-5px]"/>
            </Link>
            <Link href="https://www.youtube.com/@wapit.cz" target="_blank">
              <FaYoutube className="text-lg duration-500 hover:text-[#FF0000] hover:duration-500 hover:translate-y-[-5px]"/>
            </Link>
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-2/3 gap-3">
          <div className="flex flex-col gap-16 w-1/3">
            <h1 className="font-medium text-lg">FIRMA</h1>
            <div className="flex flex-col gap-6">
              <Link href="">O nás</Link>
              <Link href="">Firma</Link>
              <Link href="">Blog</Link>
              <Link href="">Kontakt</Link>
            </div>
          </div>
          <div className="flex flex-col gap-16 w-1/3">
            <h1 className="font-medium text-lg">NAKUPOVÁNÍ</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Doprava</Link>
              <Link href="">Platba</Link>
              <Link href="">Reklamace</Link>
              <Link href="">Všechny produkty</Link>
            </div>
          </div>
          <div className="flex flex-col gap-16 w-1/3">
            <h1 className="font-medium text-lg">INFORMACE</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Základní informace</Link>
              <Link href="">Můj účet</Link>
              <Link href="">Zpracování údajů</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">DEJ NÁM ODBĚR</h1>
          <p>
            Buďte první, kdo získá nejnovější informace o trendech, propagacích
            a mnoho dalšího!
          </p>
          <div className="flex ">
            <input type="text" placeholder="Email" className="p-4 w-3/4" />
            <button className="w-1/4 bg-wapit text-white flex justify-center items-center">
              <FaCheck />
            </button>
          </div>
          <span className="font-semibold ">Bezpečné placení</span>
          <div className="flex justify-between">
            <Image src="/paypal.png" alt="" width={40} height={20} />
            <Image src="/mastercard.png" alt="" width={40} height={20} />
            <Image src="/visa.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2024 Wapit Tech s.r.o.</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Jazyk</span>
            <span className="font-medium">Česká republika | čestina</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Měna</span>
            <span className="font-medium">CZK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
