import * as React from "react";
import { noop } from "@utils/noop";
import { IImageComponent } from "./image.interface";

const Image: React.FC<IImageComponent.IProps> = ({
    src,
    className = "__ds-image",
    onLoad = noop,
    alt,
}): JSX.Element => {
    return <img src={src} className={className} onLoad={onLoad} alt={alt} />;
};

export default Image;
