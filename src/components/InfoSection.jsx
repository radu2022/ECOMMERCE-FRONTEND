import React from 'react'
import { Headset, Truck, HandCoins, LockKeyhole, Tag } from "lucide-react";

const InfoSection = () => {
    const infoItems = [
      {
        icon: <Truck className="text-3xl text-red-600" />,
        title: "Free Shipping",
        description: "Get your orders delivered with no extra cost",
      },
      {
        icon: <Headset className="text-3xl text-red-600" />,
        title: "Supprt 24/7",
        description: "We are here to assist you anytime",
      },
      {
        icon: <HandCoins className="text-3xl text-red-600" />,
        title: "100% Money Back",
        description: "Full refund if you are not satisfied",
      },
      {
        icon: <LockKeyhole className="text-3xl text-red-600" />,
        title: "Payment Secure",
        description: "Your payment information is safe with us",
      },
      {
        icon: <Tag className="text-3xl text-red-600" />,
        title: "Discount",
        description: "Enjoy the best prices with discount on our products",
      },
    ];
  return (
    <div className='bg-white pb-8 pt-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {infoItems.map((item, index) => (
                <div key={index} className='flex flex-col items-center p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
                    {item.icon}
                    <h3 className='mt-4 text-xl font-semibold'>{item.title}</h3>
                    <p className='mt-2 text-gray-600'>{item.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default InfoSection