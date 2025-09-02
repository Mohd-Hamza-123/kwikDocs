"use client";

import React, { useState, useEffect } from "react";

interface LogEntry {
  type: string;
  value: string;
}

export default function JavaScriptTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  console.log(logs)

  useEffect(() => {
    const handler = (event: MessageEvent) => {
       console.log("📩 parent received message:", event.data); // debug
      if (event.data && event.data.type === "iframe-console") {
        if (event.data.logType === "clear") {
          setLogs([]); // clear terminal
        } else {
          setLogs((prev) => [
            ...prev,
            { type: event.data.logType, value: event.data.value },
          ]);
        }
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div
      style={{
        background: "#111",
        color: "#eee",
        padding: "10px",
        fontFamily: "monospace",
        minHeight: "200px",
        overflowY: "auto",
      }}
    >
      {logs.map((log, i) => (
        <div
          key={i}
          style={{ color: log.type === "error" ? "red" : "white" }}
        >
          [{log.type}] {log.value}
        </div>
      ))}
    </div>
  );
}
