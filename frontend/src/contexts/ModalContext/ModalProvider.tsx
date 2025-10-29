import { useState, type ReactNode } from "react";
import { ModalContext, type ModalType, type ModalTypeMap } from "./ModalContext";
import { UploadModal } from "../../components/File/modals/UploadModal";
import { EditModal } from "../../components/File/modals/EditModal";

const MODAL_COMPONENTS = {
  upload: UploadModal,
  edit: EditModal,
}

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const openModal = <T extends ModalType>(type: T, props: ModalTypeMap[T]) => {
    setModalType(type);
    setModalProps(props);
  }

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  }

  const ModalComponent = modalType ? MODAL_COMPONENTS[modalType] : null;

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      {children}
      {ModalComponent && <ModalComponent {...modalProps}/>}
    </ModalContext.Provider>
  )
}