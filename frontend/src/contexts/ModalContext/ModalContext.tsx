import { createContext } from "react";
import { type UploadModalProps } from "../../components/File/modals/UploadModal";
import type { EditModalProps } from "../../components/File/modals/EditModal";

export interface ModalTypeMap {
  upload: UploadModalProps,
  edit: EditModalProps,
}

export type ModalType = keyof ModalTypeMap;

export type ModalContextType = {
  openModal: <T extends ModalType>(type: T, props: ModalTypeMap[T]) => void,
  closeModal: () => void,
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {}
})