import { keymap } from '@codemirror/view';
import { EditorView } from '@codemirror/view';

// Define JavaScript-specific abbreviation rules
const expandJavaScriptAbbreviation = (abbreviation: string): string | null => {
    const jsExpansions: Record<string, string> = {
        'cl': 'console.log();', // Console log
        'fn': 'function name() {\n\t\n}', // Function
        'afn': 'const name = () => {\n\t\n};', // Arrow function
        'imp': "import name from 'module';", // Import statement
        'exp': 'export default name;', // Export default
    };

    return jsExpansions[abbreviation] || null;
};

// Keymap to handle abbreviation expansion
const jsKeymap = keymap.of([
    {
        key: 'Tab',
        run: (view: EditorView) => {
            const state = view.state;
            const cursor = state.selection.main.head;
            const line = state.doc.lineAt(cursor);
            const abbreviation = line.text.trim();

            const expanded = expandJavaScriptAbbreviation(abbreviation);

            if (expanded) {
                const transaction = state.update({
                    changes: { from: line.from, to: line.to, insert: expanded },
                });
                view.dispatch(transaction);
                return true; // Prevent default Tab behavior
            }

            return false; // Allow default Tab behavior if no expansion occurred
        },
    },
]);

export default jsKeymap;
