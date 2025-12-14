import * as runtime from "react/jsx-runtime";
import Callout from "./MDX Components/Callout";
import HtmlEditor from "./MDX Components/HtmlEditor";
import ImageCenter from "./MDX Components/ImageCenter";
import CopyCode from "./MDX Components/CopyCode";

const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime })?.default;
};

const components = {
    Callout,
    ImageCenter,
    HtmlEditor,
    CopyCode,
};

interface MdxProps {
    code: string;
}

export function MDXContent({ code }: MdxProps) {
    const Component = useMDXComponent(code);
    return <Component components={components} />;
}