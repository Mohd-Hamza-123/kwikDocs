import Link from "next/link";
import Image from "next/image";
import { Technology, TechnologyCategory } from "@/types/docs.type";

type Props = {
  technology: TechnologyCategory[]
}

const Technologies = async ({ technology }: Props) => {

  return <div className="flex flex-col gap-5 my-3">
    {technology?.map((techObj: TechnologyCategory) => {
      return (
        <section key={techObj?.techType}
          className="flex flex-col gap-5">

          <h1 className="text-2xl lg:text-2xl text-center capitalize font-cursive">
            {techObj?.techType}
          </h1>

          {techObj?.technologies?.map((tech: Technology, index: number) => (
            <div
              key={tech?._id + index}
              className={`relative group 
  dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:via-[#0f0f0f] dark:to-[#1f1f1f] 
  bg-gradient-to-br from-white via-gray-50 to-gray-100
  shadow-md hover:shadow-2xl rounded-2xl overflow-hidden 
  transition-all duration-500 hover:-translate-y-2 w-[94%] lg:w-[70%] mx-auto 
  flex flex-col md:flex-row ${index % 2 == 0 ? 'md:flex-row-reverse' : ''} 
  items-center border border-gray-200 dark:border-gray-800`}
            >
              {/* Image Section */}
              <div className="lg:w-[40%] w-full h-full flex items-center justify-center  p-6">
                <Image
                  className="object-contain w-full h-auto max-h-[220px] rounded-lg transition-transform duration-500 group-hover:scale-105"
                  src={tech?.image?.secure_url}
                  alt={`${tech?.name} Image`}
                  quality={100}
                  priority={true}
                  width={300}
                  height={300}
                />
              </div>

              {/* Content Section */}
              <div className="p-6 w-full lg:w-[60%] text-center md:text-left">
                <h2 className="mb-3 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  {tech?.name}
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tech?.description}
                </p>
                <Link
                  href={`/app/docs/${tech?.name?.toLowerCase()}`}
                  className="inline-block w-full md:w-auto px-6 py-2 text-lg font-semibold text-white 
      bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
      rounded-xl shadow-md hover:shadow-xl 
      hover:from-pink-600 hover:via-red-500 hover:to-orange-400 
      transition-all duration-300">
                  Learn {tech?.name}
                </Link>
              </div>
            </div>

          ))}
        </section>
      );
    })}
  </div>

};

export default Technologies;
