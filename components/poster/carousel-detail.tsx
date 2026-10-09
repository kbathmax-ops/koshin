"use client";

import Image from "next/image";
import { useRef } from "react";
import { Maximize2, X } from "lucide-react";
import type { Shot } from "@/lib/teardowns/types";

export function CarouselDetail({ shot }: { shot: Shot }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const image = (
    <div className="td-carousel-detail">
      <Image src={shot.src} alt="Close-up of the redesigned vertical portfolio logo carousel" width={shot.width} height={shot.height} sizes="2000px" className="td-spread-image" />
    </div>
  );

  return (
    <div className="td-carousel-preview">
      <button type="button" className="td-carousel-enlarge" aria-label="Enlarge portfolio carousel" onClick={() => dialog.current?.showModal()}>
        {image}
        <Maximize2 className="td-enlarge-icon" size={18} aria-hidden />
      </button>
      <dialog ref={dialog} className="td-image-dialog" aria-label="Enlarged portfolio carousel" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="td-image-dialog-content">
          <form method="dialog">
            <button className="td-image-close" aria-label="Close enlarged image"><X size={22} aria-hidden /></button>
          </form>
          {image}
        </div>
      </dialog>
    </div>
  );
}
