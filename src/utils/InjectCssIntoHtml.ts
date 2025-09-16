// utils/customDialogs.ts

const consoleBridge = `
          function send(type, args) {
            try {
              // 🚀 send raw args instead of stringified JSON
              window.parent.postMessage({
                __from: 'srcdoc-bridge',
                type: 'iframe-console',
                logType: type,
                value: args
              }, '*');
            } catch(e) {}
          }

          const methods = ['log','error','warn','info','debug','clear'];
          methods.forEach((m) => {
            const original = console[m];
            console[m] = function(...args) {
              send(m, args);
              try { original.apply(console, args); } catch(_) {}
            };
          });

          window.addEventListener('error', function(e) {
            send('error', [ e?.message ? e.message + ' at ' + (e.lineno||0) + ':' + (e.colno||0) : String(e) ]);
          });

          window.addEventListener('unhandledrejection', function(e) {
            send('error', ['Unhandled promise rejection:', e?.reason || 'Unknown']);
          });

    `;
const customAlert = window.alert = (message: string) => {
  const show = () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 999999;
      animation: fadeIn 0.2s ease;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      background: white;
      padding: 24px;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
      font: 15px system-ui, -apple-system, sans-serif;
      text-align: center;
      animation: scaleIn 0.2s ease;
    `;

    const msg = document.createElement("div");
    msg.textContent = message;
    msg.style.cssText = `
      margin-bottom: 20px;
      font-size: 16px;
      color: #333;
      line-height: 1.4;
    `;

    const btn = document.createElement("button");
    btn.textContent = "OK";
    btn.style.cssText = `
      padding: 8px 18px;
      border: none;
      border-radius: 6px;
      background: #2563eb;
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    `;
    btn.onmouseenter = () => (btn.style.background = "#1d4ed8");
    btn.onmouseleave = () => (btn.style.background = "#2563eb");
    btn.onclick = () => overlay.remove();

    box.appendChild(msg);
    box.appendChild(btn);
    overlay.appendChild(box);

    document.body!.appendChild(overlay); // safe now
  };

  if (document.body) {
    show();
  } else {
    window.addEventListener("DOMContentLoaded", show, { once: true });
  }
}


declare global {
  interface Window {
    customPrompt?: (message?: string) => Promise<string | null>;
  }
}
export { };
const customPrompt: any = window.customPrompt = (message?: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const show = () => {
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.45);
        display: flex; align-items: center; justify-content: center;
        z-index: 999999; animation: fadeIn 0.2s ease;
      `;

      const box = document.createElement("div");
      box.style.cssText = `
        background: white; padding: 24px; border-radius: 12px;
        max-width: 420px; width: 90%; box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        font: 15px system-ui, -apple-system, sans-serif; animation: scaleIn 0.2s ease;
      `;

      const msg = document.createElement("div");
      msg.textContent = message ?? "";
      msg.style.cssText = `margin-bottom: 16px; font-size: 16px; color: #333; line-height: 1.4;`;

      const input = document.createElement("input");
      input.type = "text";
      input.style.cssText = `width: 100%; padding: 8px 10px; margin-bottom: 20px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;`;
      input.onfocus = () => (input.style.borderColor = "#2563eb");
      input.onblur = () => (input.style.borderColor = "#d1d5db");

      const btnContainer = document.createElement("div");
      btnContainer.style.cssText = `display:flex; justify-content:flex-end; gap:12px;`;

      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";
      okBtn.style.cssText = `padding:8px 18px; border:none; border-radius:6px; background:#2563eb; color:white; cursor:pointer; font-size:14px; font-weight:500;`;
      okBtn.onclick = () => { resolve(input.value); overlay.remove(); };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.cssText = `padding:8px 18px; border:none; border-radius:6px; background:#e5e7eb; color:#374151; cursor:pointer; font-size:14px; font-weight:500;`;
      cancelBtn.onclick = () => { resolve(null); overlay.remove(); };

      btnContainer.appendChild(cancelBtn);
      btnContainer.appendChild(okBtn);
      box.appendChild(msg);
      box.appendChild(input);
      box.appendChild(btnContainer);
      overlay.appendChild(box);
      document.body!.appendChild(overlay);
      input.focus();
    };

    if (document.body) show();
    else window.addEventListener("DOMContentLoaded", show, { once: true });
  });
};

export function customConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const show = () => {
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.45);
        display: flex; align-items: center; justify-content: center;
        z-index: 999999;
        animation: fadeIn 0.2s ease;
      `;

      const box = document.createElement("div");
      box.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 12px;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        font: 15px system-ui, -apple-system, sans-serif;
        text-align: center;
        animation: scaleIn 0.2s ease;
      `;

      const msg = document.createElement("div");
      msg.textContent = message;
      msg.style.cssText = `
        margin-bottom: 20px;
        font-size: 16px;
        color: #333;
        line-height: 1.4;
      `;

      const btnContainer = document.createElement("div");
      btnContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 12px;
      `;

      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";
      okBtn.style.cssText = `
        padding: 8px 18px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      `;
      okBtn.onclick = () => {
        resolve(true);
        overlay.remove();
      };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.cssText = `
        padding: 8px 18px;
        background: #e5e7eb;
        color: #374151;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      `;
      cancelBtn.onclick = () => {
        resolve(false);
        overlay.remove();
      };

      btnContainer.appendChild(okBtn);
      btnContainer.appendChild(cancelBtn);

      box.appendChild(msg);
      box.appendChild(btnContainer);
      overlay.appendChild(box);

      document.body!.appendChild(overlay); // ✅ safe
    };

    if (document.body) show();
    else window.addEventListener("DOMContentLoaded", show, { once: true });
  });
}

import { CSP } from "@/constant";


// export default function injectCssAndJavascriptIntoHtml(
//   html: string,
//   css: string,
//   javascript?: string
// ) {
//   const headContentRegex = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
//   let headContent = html.match(headContentRegex);
//   let finalHeadContent = "";

//   if (headContent) {
//     let content = headContent[1];
//     content += CSP;

//     finalHeadContent =
//       `<head>` + content +
//       `<style>${css}</style>` +
//       `<script defer>
//         ${consoleBridge}
//         ${customAlert.toString()}
//         ${customPrompt.toString()}
//         ${customConfirm.toString()} +
//         ${javascript}
//       </script>` +
//       `</head>`;
//   }

//   const finalHtmlContent = html.replace(headContentRegex, finalHeadContent);
//   return finalHtmlContent;
// }

export default function injectCssAndJavascriptIntoHtml(
  html: string,
  css: string,
  javascript?: string
) {
  const headContentRegex = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
  const bodyCloseRegex = /<\/body>/i;

  let finalHtml = html;

  // --- inject CSS (still in head) ---
  if (headContentRegex.test(html)) {
    finalHtml = finalHtml.replace(
      headContentRegex,
      (match, inner) =>
        `<head>${inner}${CSP}<style>${css}</style></head>`
    );
  } else {
    // no <head>, inject a new one after <html>
    finalHtml = finalHtml.replace(
      /<html\b[^>]*>/i,
      (match) => `${match}<head>${CSP}<style>${css}</style></head>`
    );
  }

  // --- inject JS (before </body>) ---
  const safeJs = (javascript || "").replace(/<\/script>/gi, "<\\/script>");
  const scriptBlock = `
    <script>
      ${consoleBridge}
      ${customAlert.toString()}
      ${customPrompt.toString()}
      ${customConfirm.toString()}
      document.addEventListener('DOMContentLoaded', function() {
        try { ${safeJs} } catch(e) { console.error(e); }
      });
    </script>
  `;

  if (bodyCloseRegex.test(finalHtml)) {
    finalHtml = finalHtml.replace(bodyCloseRegex, scriptBlock + "</body>");
  } else {
    finalHtml += scriptBlock;
  }

  return finalHtml;
}


export function injectCssIntoHtml(html: string, css: string) {
  const headContentRegex = /<head\b[^>]*>([\s\S]*?)<\/head>/i
  let headContent = html.match(headContentRegex)
  let finalHeadContent = ''
  if (headContent) {
    // console.log(headContent)
    let content = headContent[1]
    finalHeadContent = `<head>` + content + `<style>

    ${css}
    
    </style>` + `</head>`
  }
  else {

  }

  const finalHtmlContent = html.replace(headContentRegex, finalHeadContent)
  return finalHtmlContent
}


