// Worker script: loads pyodide and executes code on demand
self.isReady = false;
self.pyodide = null;

async function init() {
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js");
  self.pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.0/full/" });
  self.isReady = true;
  self.postMessage({ type: "ready" });
}
init();

self.onmessage = async (e) => {
  const msg = e.data;
  if (msg.type === "run") {
    if (!self.isReady) {
      self.postMessage({ type: "error", error: "Pyodide not ready" });
      return;
    }
    const code = msg.code || "";
    try {
      // capture stdout/stderr
      const result = await self.pyodide.runPythonAsync(`
import sys, io
_out = io.StringIO()
_err = io.StringIO()
try:
    old_stdout, old_stderr = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = _out, _err
    # user code:
${code.split("\n").map(s => "    " + s).join("\n")}
finally:
    sys.stdout, sys.stderr = old_stdout, old_stderr

(_out.getvalue(), _err.getvalue())
`);
      // result is a Pyodide proxy array: [stdout, stderr]
      self.postMessage({ type: "result", out: result[0] || "", err: result[1] || "" });
    } catch (err) {
      self.postMessage({ type: "error", error: String(err) });
    }
  }
};
