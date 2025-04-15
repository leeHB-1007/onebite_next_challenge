/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect } from "react";
import style from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={style.modal}
      onClose={() => {
        router.back();
      }}
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLDialogElement
  );
}
