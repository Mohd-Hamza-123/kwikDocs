"use client";

import React from "react";
import { useTheme } from "next-themes";
import JSONView from "@uiw/react-json-view";
import { useAppSelector } from "@/lib/hooks/hooks";
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import { nordTheme } from '@uiw/react-json-view/nord';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { gruvboxTheme } from '@uiw/react-json-view/gruvbox';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { basicTheme } from '@uiw/react-json-view/basic';


export default function JavaScriptTerminal() {
  const logs = useAppSelector((state) => state.logsSlice.javaScriptLogs);
  const { theme } = useTheme();

  return (
    <div className="w-full h-full overflow-auto bg-black/40 p-4 rounded-md font-mono text-sm">
      {logs.map((log, i) => {
        let color = "white";
        if (log.type === "error") color = "red";
        if (log.type === "warn") color = "yellow";
        if (log.type === "info") color = "green";
        if (log.type === "debug") color = "blue";

        const renderValue = (val: any, key?: number) => {
          if (val === null || val === undefined) {
            return (
              <span
                key={key}
                className="ml-2 italic text-gray-400"
              >
                {String(val)}
              </span>
            );
          }

          if (typeof val === "object") {
            return (
              <JSONView
                key={key}
                value={val}
                collapsed={1}
                displayDataTypes={false}
                enableClipboard={false}
                style={{
                  ...(theme === "dark" ? darkTheme : lightTheme),
                  fontSize: '16px'
                }}
              />
            );
          }

          return (
            <span key={key} className="ml-2">
              {String(val)}
            </span>
          );
        };

        return (
          <div key={i} style={{ color }} className="mb-2">
            <span className="font-bold">[{log.type}]</span>
            <div className="ml-2">
              {Array.isArray(log.value)
                ? log.value.map((arg: any, j: number) => renderValue(arg, j))
                : renderValue(log.value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
