import React from "react";
import { assets } from "../assets/images/assets";

export default function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 text-center p-20 text-xs sm:text-sm md:text-base textga700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          doloremque hic rerum.
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          doloremque hic rerum.
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          doloremque hic rerum.
        </p>
      </div>
    </div>
  );
}
