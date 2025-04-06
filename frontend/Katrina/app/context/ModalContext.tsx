import { createContext, useContext, useState, ReactNode } from 'react'

type ModalType = 'login' | 'register' | null

interface ModalContextType {
  isOpen: boolean
  modalType: ModalType
  openModal: (type: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(null)

  const openModal = (type: ModalType) => {
    setModalType(type)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalType(null)
  }

  return (
    <ModalContext.Provider value={{ isOpen, modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal debe ser usado dentro de un ModalProvider')
  }
  return context
} 