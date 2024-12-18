import React from "react";

const DocsBookmarks = ({ doc }: any) => {

  const { bookmark } = doc || {};
  
  return (
    <div className="px-2 py-2">
      <p className="mt-4 text-center">Bookmarks</p>
      <section className="flex flex-col gap-1 mt-5">
        {bookmark?.map((mark: any) => (
          <li
            key={mark?.bookmarkID}
            className="py-3 md:py-2 sm:py-4 list-disc list-inside cursor-pointer"
            onClick={() => {
              const element = document.getElementById(mark.bookmarkID);
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth", // Optional: smooth scroll
                });
              } else {
                console.warn(`Element with ID ${mark.bookmarkID} not found.`);
              }
            }}
          >
            {mark?.bookmarkName}
          </li>
        ))}
      </section>
    </div>
  );
};

export default DocsBookmarks;

// import React, { useEffect, useState } from "react";

// interface BookmarkListProps {
//   content: string;
// }

// const DocsBookmarks: React.FC<BookmarkListProps> = ({ content }) => {
//   const [headings, setHeadings] = useState<string[]>([]);
//   console.log(headings);
//   useEffect(() => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(content, "text/html");
//     const headingsArray = Array.from(
//       doc.querySelectorAll("h1, h2, h3, h4, h5, h6")
//     );
//     const headingIds = headingsArray.map((heading, index) => {
//       if (!heading.id) {
//         heading.id = `heading-${index}`;
//       }
//       return heading.id;
//     });
//     setHeadings(headingIds);
//   }, [content]);

//   const handleScrollTo = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div>
//       <h2>Bookmarks</h2>
//       <ul>
//         {headings.map((id, index) => (
//           <li key={id}>
//             <button onClick={() => handleScrollTo(id)}>
//               Heading {index + 1}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocsBookmarks;
