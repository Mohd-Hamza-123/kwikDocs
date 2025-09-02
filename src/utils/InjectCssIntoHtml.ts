// utils/customDialogs.ts

export function customAlert(message: string): void {
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

export function customPrompt(
  message: string,
  defaultValue = ""
): Promise<string | null> {
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
        animation: scaleIn 0.2s ease;
      `;

      const msg = document.createElement("div");
      msg.textContent = message;
      msg.style.cssText = `
        margin-bottom: 16px;
        font-size: 16px;
        color: #333;
        line-height: 1.4;
      `;

      const input = document.createElement("input");
      input.type = "text";
      input.value = defaultValue;
      input.style.cssText = `
        width: 100%;
        padding: 8px 10px;
        margin-bottom: 20px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
      `;
      input.onfocus = () => (input.style.borderColor = "#2563eb");
      input.onblur = () => (input.style.borderColor = "#d1d5db");

      const btnContainer = document.createElement("div");
      btnContainer.style.cssText = `
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      `;

      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";
      okBtn.style.cssText = `
        padding: 8px 18px;
        border: none;
        border-radius: 6px;
        background: #2563eb;
        color: white;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      `;
      okBtn.onclick = () => {
        resolve(input.value);
        overlay.remove();
      };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.cssText = `
        padding: 8px 18px;
        border: none;
        border-radius: 6px;
        background: #e5e7eb;
        color: #374151;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      `;
      cancelBtn.onclick = () => {
        resolve(null);
        overlay.remove();
      };

      btnContainer.appendChild(cancelBtn);
      btnContainer.appendChild(okBtn);

      box.appendChild(msg);
      box.appendChild(input);
      box.appendChild(btnContainer);
      overlay.appendChild(box);

      document.body!.appendChild(overlay); // ✅ safe

      input.focus();
    };

    if (document.body) show();
    else window.addEventListener("DOMContentLoaded", show, { once: true });
  });
}

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


export default function injectCssAndJavascriptIntoHtml(
  html: string,
  css: string,
  javascript: string
) {
  const headContentRegex = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
  let headContent = html.match(headContentRegex);
  let finalHeadContent = "";

  if (headContent) {
    let content = headContent[1];
    content += CSP;

    finalHeadContent =
      `<head>` +
      content +
      `<style>${css}</style>` +
      `<script defer>
        ${customAlert.toString()}
        ${customPrompt.toString()}
        ${customConfirm.toString()}

        // ✅ Console bridge
        (function () {
          function send(type, value) {
            try {
              parent.postMessage(
                { type: "iframe-console", logType: type, value },
                "*"
              );
            } catch {}
          }

          const methods = ["log", "error", "warn", "info", "debug", "clear"];
          methods.forEach((method) => {
            const old = console[method];
            console[method] = function (...args) {
              if (old) old.apply(console, args);
              if (method === "clear") {
                send("clear", "");
              } else {
                send(
                  method,
                  args
                    .map((a) =>
                      typeof a === "object"
                        ? JSON.stringify(a)
                        : String(a)
                    )
                    .join(" ")
                );
              }
            };
          });

          window.onerror = function (msg, url, line, col) {
            send("error", msg + " at " + line + ":" + col);
          };

          window.onunhandledrejection = function (e) {
            send("error", "Unhandled promise rejection: " + e.reason);
          };
        })();
      </script>` +
      `<script defer>
        try {
          ${javascript}
        } catch (err) {
          parent.postMessage(
            { type: "iframe-console", logType: "error", value: err.message },
            "*"
          );
        }
      </script>` +
      `</head>`;
  }

  const finalHtmlContent = html.replace(headContentRegex, finalHeadContent);
  return finalHtmlContent;
}
