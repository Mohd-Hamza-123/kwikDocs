import { toast } from "@/hooks/use-toast";


function copyToClipboard(copyText: any) {
    navigator.clipboard.writeText(copyText).then(
        () => {
            () => {
                'use client'
                toast({
                    variant: "default",
                    title: "text copied"
                })
            }
        },
        (err) => {
            console.error("Failed to copy text: ", err);
        }
    );
}

export function makeCodeBlock() {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((element) => {
        // Checking if the button already exists
        if (!element.querySelector(".copyBtn")) {
            const copyBtn = document.createElement("button");
            copyBtn.innerText = "Copy code";
            copyBtn.setAttribute("class", "copyBtn");
            copyBtn.setAttribute("type", "button");
            element.prepend(copyBtn);

            let copyText = element.textContent;
            copyBtn.addEventListener("click", () => copyToClipboard(copyText));
        }
    });
}
