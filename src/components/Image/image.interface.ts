declare namespace IImageComponent {
    export interface IProps {
        url: string;
        className?: string;
        onLoad?: (any) => void;
        alt: string;
    }
}

export type { IImageComponent };
