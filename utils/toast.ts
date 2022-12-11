import { toast } from 'react-toastify';

/**
 *
 * @param flag kind of message(1: success, 2: error, 3: warning)
 * @param text toast message
 */
export const showToast = (flag: number, text: string) => {
  const position = toast.POSITION.BOTTOM_RIGHT

  switch (flag) {
    case 1:
      toast.success(text, { position })
      break
    case 2:
      toast.error(text, { position })
      break
    case 3:
      toast.warning(text, { position })
      break
  }
}
