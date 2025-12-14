declare module 'emmet' {
    export function expandAbbreviation(
        abbreviation: string,
        options: { syntax: string }
    ): string;
}
