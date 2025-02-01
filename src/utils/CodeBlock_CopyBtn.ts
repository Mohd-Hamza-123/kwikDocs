import { toast } from '@/hooks/use-toast'


function copyToClipboard(copyText: string) {

    navigator.clipboard.writeText(copyText)
        .then(() => {
            'use client'
            toast({
                title: "Text Copied"
            })
        })
        .catch((err) => {
            'use client'
            toast({
                variant: "destructive",
                title: "Text not copied"
            })
        })

}

export function makeCodeBlock() {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((element) => {
        let copyBtn;
        let copyText: string;
        // Checking if the button already exists
        if (!element.querySelector(".copyBtn")) {
            copyBtn = document.createElement("button");
            copyBtn.innerHTML = `<img width="23" height="23" src="https://img.icons8.com/material-outlined/24/copy.png" alt="copy code"/>`;
            copyBtn.setAttribute("class", "copyBtn");
            copyBtn.setAttribute("type", "button");
            element.prepend(copyBtn);

            copyText = element.textContent || '';
       
            copyBtn.addEventListener("click", () => copyToClipboard(copyText));
        }
        if (copyBtn) copyBtn.addEventListener("click", () => copyToClipboard(copyText));
    });
}
