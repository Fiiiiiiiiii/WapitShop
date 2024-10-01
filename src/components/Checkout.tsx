"use client"

import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react'
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";

const Checkout = () => {
    const wixClient = useWixClient();
    const { cart, isLoading, removeItem, addItem } = useCartStore();

    const [form2SelectedOption, setForm2SelectedOption] = useState('');
    const [cenaDopravy, setCenaDopravy] = useState(0);

    const [jmeno, setJmeno] = useState("");
    const [prijmeni, setPrijmeni] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
        const [carriers, setCarriers] = useState("PPL");
        const [zasilkovna_ID, setZasilkovna_ID] = useState(123456);
        const [postCode, setPostCode] = useState(11000);
    const [stat, setStat] = useState("");
    const [ulice, setUlice] = useState("");
    const [mesto, setMesto] = useState("");
    const [psc, setPsc] = useState("");
        // const [deliveryAddress, setDeliveryAddress] = useState("");
        // const [invoiceAddress, setInvoiceAddress] = useState("");
        const [payType, setPayType] = useState("Credit_card");
        const [payId, setPayId] = useState("PAY123456");
        const [payStatus, setPayStatus] = useState("Paid");
        const [status, setStatus] = useState("Pending");

    const handleForm2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm2SelectedOption(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = async () => {

        const cartItems = cart.lineItems?.map(item => ({
            "productName": (item.productName?.original)?.toString(),
            "quantity": item.quantity,
            "tax": 21,
            "price": Number(item.price?.amount!) * item.quantity!
        }));

        console.log(cart)

        const deliveryAddress = `${ulice}, ${mesto}, ${psc}, ${stat}`;
        const invoiceAddress = `${ulice}, ${mesto}, ${psc}, ${stat}`;

        const data = {
            "name": jmeno,
            "lastName": prijmeni,
            "phone": telefon,
            "email": email,
            "carrier": carriers,
            "zasilkovna_ID": zasilkovna_ID,
            "postCode": postCode,
            "deliveryAddress": deliveryAddress,
            "invoiceAddress": invoiceAddress,
            "payType": payType,
            "payId": payId,
            "payStatus": payStatus,
            "status": status,
            "cartItems": cartItems
        };

        console.log(data);

        //test
        try {
            const res = await fetch('https://api.wapit.cz/api/Shop/createOrder', {
              method:"PUT",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify(data),
            })


            if (!res.ok) {
                throw new Error('Chyba při odesílání dat / Chyba při vytváření objednávky');
            }

            const responseData = await res.json();
            console.log('Objednávka úspěšně vytvořena:', responseData);

        } catch (err) {
            console.error(err)
        }
    }

  return (
    <div className="flex flex-col justify-between flex-wrap lg:flex-row mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
        <div className="flex flex-col w-[60%]">

            <div className=''>

                {/* Form 1 */}
                <form className='flex flex-col gap-4 px-6 pt-6 pb-10 bg-gray-100 rounded-xl'>
                    <h1 className='font-semibold text-xl'>Adresa</h1>
                    <div className="flex flex-col gap-2">
                        <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                        type="text"
                        name="jmeno"
                        placeholder="Jméno"
                        className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                        onChange={(e) => setJmeno(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                        type="text"
                        name="prijmeni"
                        placeholder="Příjmení"
                        className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                        onChange={(e) => setPrijmeni(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                        type="text"
                        name="stat"
                        placeholder="Stát"
                        className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                        onChange={(e) => setStat(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                        type="text"
                        name="ulice"
                        placeholder="Ulice"
                        className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                        onChange={(e) => setUlice(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <div className="flex flex-col gap-2 w-[65%]">
                            <input
                            type="text"
                            name="mesto"
                            placeholder="Město"
                            className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                            onChange={(e) => setMesto(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-[30%]">
                            <input
                            type="text"
                            name="psc"
                            placeholder="PSČ"
                            className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                            onChange={(e) => setPsc(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                        type="text"
                        name="telefon"
                        placeholder="Telefon"
                        className="ring-1 ring-neutral-500 rounded-md p-3 bg-transparent text-black placeholder-gray-800"
                        onChange={(e) => setTelefon(e.target.value)}
                        />
                    </div>
                </form>

                {/* Form 2 */}
                <form className='flex flex-col gap-4 px-6 p-6 mt-8 bg-gray-100 rounded-xl'>
                    <h1 className='font-semibold text-xl'>Způsob dopravy</h1>
                    <div className='flex justify-between'>
                        <label>
                        <input
                            type="radio"
                            value="Zasilkovna"
                            checked={form2SelectedOption === 'Zasilkovna'}
                            onChange={(e) => {
                                handleForm2Change(e);
                                setCenaDopravy(69);
                            }}
                        />
                        Zásilkovna
                        </label>
                        <h3>69 Kč</h3>
                    </div>
                    <div className='flex justify-between'>
                        <label>
                        <input
                            type="radio"
                            value="PPL"
                            checked={form2SelectedOption === 'PPL'}
                            onChange={(e) => {
                                handleForm2Change(e);
                                setCenaDopravy(79);
                            }}
                        />
                        PPL
                        </label>
                        <h3>79 Kč</h3>
                    </div>
                </form>

            </div>

        </div>

        <div className="w-[30%] lg:sticky">
            <div className="p-6 font-semibold">
                <div className="flex justify-between">
                    <h3 className="">Mezisoučet</h3>
                    <div>{(cart as any).subtotal?.amount || 0} Kč</div>
                </div>
                <div className="flex justify-between">
                    <h3 className="">Doprava</h3>
                    <div>{cenaDopravy} Kč</div>
                </div>
                <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                <div className="flex justify-between mb-6">
                    <h3 className="">Celkem</h3>
                    <div>{(Number((cart as any).subtotal?.amount) || 0) + Number(cenaDopravy)} Kč</div>
                    </div>
                <div className="flex justify-center mb-6">
                    <Link href="/pokladna" className='w-full'>
                        <button
                        className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
                        disabled={isLoading}
                        onClick={() => handleSubmit()}
                        >
                            Potvrdit
                        </button>
                    </Link>
                </div>
                <div className="text-sm mb-4">Přijímáme</div>
                <div className="flex justify-center items-center gap-5">
                    <Image src="/mastercard.png" alt="mastercard" width={60} height={30} className="w-16 h-8"/>
                    <Image src="/visa.png" alt="visa" width={60} height={30} className="w-16 h-8"/>
                    <Image src="/online-platba-kartou.png" alt="online-platba-kartou" width={60} height={40} className="w-20 h-10"/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Checkout