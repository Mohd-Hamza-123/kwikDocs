import Image from "next/image";
import { Callout } from "./Callout";
import * as runtime from "react/jsx-runtime";
import ImageCenter from "./MDX Components/ImageCenter";

const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime })?.default;
};

const components = {
    Image,
    Callout,
    ImageCenter,
};

interface MdxProps {
    code: string;
}

export function MDXContent({ code }: MdxProps) {
    const Component = useMDXComponent(code);
    return <Component components={components} />;
}