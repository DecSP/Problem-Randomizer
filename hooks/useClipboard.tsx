import { useState } from 'react'

const useClipboard = (value: string) => {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = () => {
    if (!hasCopied) {
      navigator.clipboard.writeText(value)

      setHasCopied(true)

      setTimeout(() => {
        setHasCopied(false)
      }, 3000)
    }
  }

  return { onCopy, hasCopied }
}

export default useClipboard
