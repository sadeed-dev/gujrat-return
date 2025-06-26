// components/partials/OfferDiscloseDialog.jsx
import React from "react"
import ConfirmDialog from "../dialog-box/ConfirmDialog"
import { useReactivateChatroom } from "../../hook/use-lfachat.hook"

const OfferDiscloseDialog = ({ open, row, onClose }) => {
  const { mutate: reactivateChatRoom } = useReactivateChatroom()

  const handleConfirm = () => {
    if (row) {
      reactivateChatRoom({ lfaId: row._id })
    }
    onClose()
  }

  return (
    <ConfirmDialog
      open={open}
      title="Offer Already Disclosed"
      content="This offer has already been disclosed. Do you want to reactivate this LFA offer?"
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Reactivate"
      cancelLabel="Cancel"
      themeColor="#f59e0b"
    />
  )
}

export default OfferDiscloseDialog
