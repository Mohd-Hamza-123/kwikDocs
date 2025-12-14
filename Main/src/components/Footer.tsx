import React from "react";
import Link from "next/link";
import { svgIcons } from "./icons";
import { siteConfig } from "../../config/site";

const Footer = () => {

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700">
      <section>
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-4 px-4 py-3 sm:flex-row sm:justify-between sm:py-4">
        {/* Left text */}
        <span className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
          &copy; {new Date().getFullYear()} <strong>Kwik Docs</strong>. All
          Rights Reserved.
        </span>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 sm:justify-end">
          <Link href={siteConfig.links.github} target="_blank">
            <svgIcons.github className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:fill-white cursor-pointer" />
          </Link>

          <Link href={siteConfig.links.twitter} target="_blank">
            <svgIcons.twitter className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:fill-white cursor-pointer" />
          </Link>

          <Link href={siteConfig.links.instagram} target="_blank">
            <svgIcons.instagram className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
          </Link>
        </div>
      </div>
      </section>
      <section className="text-center">
        <Link href={"/about"} className="text-gray-500">About</Link>
      </section>
    </footer>
  );
};

export default Footer;
