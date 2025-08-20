import Link from "next/link";
import Image from "next/image";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech";

const Technologies = async () => {

  const technology = await getAllTechnology();

  if (!technology) {
    return (
      <div className="text-center text-red-600 py-10">
        <p>⚠️ Failed to load technologies. Check your Internet Connection or try again later.</p>
      </div>
    );
  }

  return <div className="dark:bg-bgDark bg-gray-100 flex flex-col gap-5">
    {technology?.map((techObj: any) => {
      return (
        <section key={techObj?.techType}
          className="flex flex-col gap-5">

          <h1 className="text-2xl lg:text-2xl text-center capitalize font-cursive">
            {techObj?.techType}
          </h1>

          {techObj?.technologies?.map((tech: any, index: number) => (
            <div
              key={tech?._id + index}
              className={`dark:bg-gradient-to-br dark:from-[#1e1e1e] dark:via-[#121212] dark:to-[#2c2c2c] bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl w-[94%] lg:w-[70%] mx-auto flex flex-col md:flex-row ${index % 2 == 0 ? 'md:flex-row-reverse' : ''} items-center`}>

              <div className="lg:w-[35%] w-full p-3 h-full flex items-center">
                <Image
                  className="object-cover w-full rounded-sm"
                  src={tech?.image?.secure_url}
                  alt={`${tech?.name} Image`}
                  quality={100}
                  priority={true}
                  width={100}
                  height={100} />
              </div>

              <div className="p-5 w-full lg:w-[65%]">
                <h2 className="mb-2 text-xl lg:text-2xl font-semibold text-center">
                  {tech?.name}
                </h2>
                <p className="mb-4 text-base text-gray-500 text-justify">
                  {tech?.description}
                </p>
                <Link href={`/docs/${tech?.name?.toLowerCase()}`}
                  className="block w-full px-4 py-1 text-center text-lg font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:from-pink-600 hover:via-red-500 hover:to-orange-400 focus:outline-none transition-all duration-300">
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
