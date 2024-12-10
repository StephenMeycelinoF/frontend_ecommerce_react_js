import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import NewsletterBox from "../components/NewsletterBox";

export default function About() {
  return (
    <div>
      <div className="text-2xl text-start pt-8 border-t">
        <Title title={"About"} subtitle={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, qui repellendus! Architecto, officia natus iste eligendi
            reiciendis voluptatem iusto culpa!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sed
            aliquid fugit? Voluptate ipsum, quasi voluptatibus consequuntur
            beatae reiciendis doloribus?
          </p>
          <b className="text-gray-800">Our Misson</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            officiis obcaecati saepe repudiandae hic omnis recusandae rem
            impedit earum libero!
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title title={"WHY"} subtitle={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            omnis tempore perferendis, quo sapiente nemo?
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            omnis tempore perferendis, quo sapiente nemo?
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            omnis tempore perferendis, quo sapiente nemo?
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}
