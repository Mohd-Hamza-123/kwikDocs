import { Prec } from "@codemirror/state";
import { keymap } from "@codemirror/view";

export function createCssPropertyKeyMap() {
  return Prec.highest(keymap.of([{
    key: "Enter",
    run: (view) => {
      const { state, dispatch } = view;
      const cursor = state.selection.main.head;
      const before = state.sliceDoc(cursor - 1, cursor);

      // If the last character is ":", insert " ;"
      if (before === ":") {
        dispatch(state.update({
          changes: { from: cursor, insert: " ;" },
          selection: { anchor: cursor + 1 } // place cursor before semicolon
        }));
        return true;
      }

      return false; // fallback to normal Enter
    }
  }]));
}
