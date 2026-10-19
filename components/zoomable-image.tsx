"use client";

import { useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
};

/** An image that opens full screen on click. Escape, the close button, or a click anywhere closes it. */
export function ZoomableImage({ src, alt, width, height, sizes }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full cursor-zoom-in"
        aria-label={`Enlarge: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="w-full h-auto" />
      </button>

      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none cursor-zoom-out bg-transparent p-4 md:p-10 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className="h-full w-full object-contain"
          />
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-black transition-opacity hover:opacity-100 opacity-85"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </dialog>
    </>
  );
}
