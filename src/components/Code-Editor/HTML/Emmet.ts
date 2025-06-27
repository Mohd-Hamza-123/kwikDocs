import { EditorView } from "@codemirror/view";
const expand = require("emmet").default;

const createEmmetKeyMap = (syntax: string) => {
    return {
        key: "Tab",
        run: (view: EditorView) => {
            const { state } = view;
            const { from, to } = state.selection.main;

            // Extract the abbreviation
            const text =
                from === to
                    ? state.doc.sliceString(state.doc.lineAt(from).from, to)
                    : state.doc.sliceString(from, to);

            console.log("Abbreviation detected:", text); // Debug

            try {
                const expanded = expand(text.trim(), {
                    syntax,
                });
                console.log("Expanded abbreviation:", expanded); // Debug

                // Determine the range to replace
                const lineStart = state.doc.lineAt(from).from;
                const abbreviationStart = from === to ? lineStart : from;

                // Replace the abbreviation with the expanded code
                view.dispatch({
                    changes: { from: abbreviationStart, to, insert: expanded },
                });

                return true; // Indicate the keymap handled the event
            } catch (error) {
                console.error("Emmet expansion error:", error);
                return false;
            }
        },
        preventDefault: true, // Prevent default Tab behavior
    };
};

export default createEmmetKeyMap;
