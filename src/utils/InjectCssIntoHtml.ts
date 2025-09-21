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

  

import { CSP } from "@/constant";


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


