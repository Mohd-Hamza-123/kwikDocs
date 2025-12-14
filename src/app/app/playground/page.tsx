import React from "react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { svgIcons } from "@/components";

const languages = [
  {
    name: "HTML & CSS",
    path: "/app/playground/html-css",
    fullLogoBg: false,
    icon: (
      <div className="flex items-center gap-3 justify-center">
        <svgIcons.html className="w-16 md:w-20 lg:w-24" />
        <svgIcons.css className="w-16 md:w-20 lg:w-24" />
      </div>
    ),
  },
  {
    name: "HTML , CSS & JavaScript",
    path: "/app/playground/html-css-javascript",
    fullLogoBg: true, // <-- this makes the logo background span full card width
    icon: (
      <div className="flex items-center gap-3 justify-center">
        <svgIcons.html className="w-16 md:w-20 lg:w-24" />
        <svgIcons.javascript className="w-12 md:w-16 lg:w-20" />
        <svgIcons.css className="w-16 md:w-20 lg:w-24" />
      </div>
    ),
  },
  {
    name: "Python",
    path: "/app/playground/python",
    fullLogoBg: false,
    icon: <svgIcons.python className="w-20 md:w-24 lg:w-28" />,
  },
];

const Playground = () => {
  return (
    <div className="min-h-[91dvh] w-full py-12 px-6 bg-white dark:bg-bgDark">
      <h1 className="text-center text-gray-900 dark:text-gray-100 text-3xl md:text-4xl font-extrabold mb-10 tracking-wide">
        Choose Your Language
      </h1>

      <div className="w-full md:w-[94%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {languages.map((language) => (
          <Link
            href={language.path}
            key={language.name}
            className="w-full flex" /* makes children stretch to equal height */
          >
            <Card
              className="flex flex-col h-full w-full relative overflow-hidden rounded-2xl border border-gray-800/30 dark:border-gray-700/40 bg-gradient-to-b from-white/5 to-white/2 dark:from-[#0f0f0f] dark:to-[#151515] shadow-[0_8px_30px_rgba(2,6,23,0.6)] transition-transform transform hover:-translate-y-1 hover:scale-[1.01]"
              aria-label={language.name}
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-3 flex-1">
                {/* Logo band */}
                {language.fullLogoBg ? (
                  /* Full-width background behind logos (spans full card width) */
                  <div className="w-full">
                    <div className="w-full p-6 flex items-center justify-center transition-transform transform hover:-translate-y-1 hover:scale-[1.01]">
                      <div className="flex items-center justify-center gap-6">
                        {language.icon}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Centered logo band with limited width */
                  <div className="w-full flex justify-center">
                    <div className="p-4 inline-flex items-center justify-center">
                      {language.icon}
                    </div>
                  </div>
                )}

                {/* Title section */}
                <div className="mt-auto w-full">
                  <CardTitle className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-100">
                    {language.name}
                  </CardTitle>
                </div>
              </CardContent>

              {/* glass highlight (visual depth) */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/2 to-transparent opacity-30 mix-blend-overlay" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Playground;
