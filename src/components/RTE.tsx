'use client'
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { generateUniqueId } from "@/utils/ConvertDate";

interface RTEType {
  name: string;
  control: any;
  defaultValue: string;
  getBookMark: any;
  bookMark: any;
  setBookMark: any;
}

const App: React.FC<RTEType> = ({
  name,
  control,
  defaultValue = "",
  getBookMark,
}) => {

  const [currentEditorValue, setcurrentEditorValue] = useState(defaultValue);
  const editorRef = useRef<any>(null);


  return (
    <Controller
      name={name || "description"}
      control={control}
      render={({ field: { onChange } }) => (
        <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={defaultValue}
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
          init={{
            height: 500,
            menubar: true,
            codesample_global_prismjs: true,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | anchor | removeformat | custom_anchor | codesample",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            codesample_languages: [
              { text: "Python", value: "python" },
              { text: "HTML/XML", value: "markup" },
              { text: "JavaScript", value: "javascript" },
              { text: "JSX", value: "jsx" },
              { text: "TypeScript", value: "typescript" },
              { text: "TSX", value: "tsx" },
              { text: "CSS", value: "css" },
              { text: "Markdown", value: "markdown" },
              { text: "Java", value: "java" },
              { text: "C", value: "c" },
              { text: "C++", value: "cpp" },
              { text: "C#", value: "csharp" },
              { text: "SCSS", value: "scss" },
            ],
            file_picker_callback: function (cb, value, meta) {
              const input = document.createElement("input");
              input.setAttribute("type", "file");

              input.addEventListener("change", (e: any) => {
                const file = e.target.files[0];

                if (!file) return;

                const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
                if (file.size > MAX_FILE_SIZE) {
                  alert("Image must be less than or equal to 1 MB.");
                  return;
                }

                const reader = new FileReader();
                reader.onload = function () {
                  if (typeof reader.result === "string") {
                    cb(reader.result, {
                      alt: file.name,
                      width: "400px",
                      height: "250px",
                    });
                  }
                };
                reader.readAsDataURL(file);
              });

              input.click();
            },
            setup: (editor) => {
              editor.ui.registry.addButton("custom_anchor", {
                text: "Add Anchor",
                onAction: function (_) {
                  const anchorName = prompt("Enter anchor name:");
                  const bookmarkID = generateUniqueId();
                  const bookmarkName = anchorName;
               
                  if (anchorName) {
                    editor.insertContent(`<a id="BookMark${bookmarkID}"></a>`);
                    getBookMark({
                      bookmarkID: `BookMark${bookmarkID}`,
                      bookmarkName,
                    });
                  }
                },
              });
            },
          }}
          onEditorChange={(content, editor) => {
            onChange(content);
            // setcurrentEditorValue(content);
          }}
        />
      )}
    />
  );
};

export default App;
