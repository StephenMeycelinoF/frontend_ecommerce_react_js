import Title from "../components/Title";
import {assets} from "../assets/images/assets";
import NewsletterBox from "../components/NewsletterBox";
export default function Contact() {
  return (
    <div>
      <div className="text-start text-2xl pt-10 border-t">
        <Title title={"CONTACT"} subtitle={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Lorem, ipsum dolor. <br /> Lorem ipsum dolor sit amet, Indonesia</p>
          <p className="text-gray-500">Telp: (+628) 888 8888 <br /> Email: lokamart@ecommerce.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Lokamart</p>
          <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}
