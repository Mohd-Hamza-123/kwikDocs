import Image from "next/image";
import { Callout } from "./Callout";
import * as runtime from "react/jsx-runtime";
import ImageCenter from "./MDX Components/ImageCenter";
import HtmlEditor from "./MDX Components/HtmlEditor";
const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime })?.default;
};

const components = {
    Image,
    Callout,
    ImageCenter,
    HtmlEditor,
};

interface MdxProps {
    code: string;
}

export function MDXContent({ code }: MdxProps) {
    const Component = useMDXComponent(code);
    return <Component components={components} />;
}