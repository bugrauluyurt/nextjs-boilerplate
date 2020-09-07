declare namespace IImageComponent {
    export interface IProps {
        src: string;
        className?: string;
        onLoad?: (any) => void;
        alt: string;
    }
}

export type { IImageComponent };
