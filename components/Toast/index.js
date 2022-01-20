import { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'
import errorSrc from './error.svg'
import styles from './index.module.css'

const ToastContext = createContext();

const Toast = ({ message }) => {
  return (
    <div className={styles.toast}>
      <div className={styles.toastcontent}>
        <Image
          src={errorSrc}
          alt="error icon"  
        />
        <div className={styles.text}>
          <div className={styles.title}>Error</div>
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  )
}

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timeout = setTimeout(() => setToasts([...toasts.slice(1)]), 10000)
      return () => clearTimeout(timeout)
    }
  }, [toasts])

  // Example call: addToast({ message: 'Invalid selection' })
  const addToast = useCallback(
    (toast) => {
      toast.id = uuidv4() // Unique ID for key
      setToasts([...toasts, toast])
    },
    [toasts]
  )

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className={styles.toastcontainer}>
        {toasts.map((toast) => <Toast key={toast.id} message={toast.message} />)}
      </div>
    </ToastContext.Provider>
  )
}

const useToast = () => {
  return useContext(ToastContext)
}

export { ToastContextProvider, useToast }