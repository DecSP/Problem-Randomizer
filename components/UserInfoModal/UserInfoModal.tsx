import { Dispatch, SetStateAction, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { GetUsersData } from '../../lib/schema'
import { IconClose, IconCopy, IconCheckFilled } from '../icons/'
import useClipboard from '../../hooks/useClipboard'

export interface UserInfoModalProps {
  data: Partial<GetUsersData>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const UserInfoModal = (props: UserInfoModalProps) => {
  const { data, open, setOpen } = props

  const closeModal = () => {
    setOpen(false)
  }

  const { onCopy, hasCopied } = useClipboard(JSON.stringify(data))

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center p-6 justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                data-testid={`${data?.username}-modal-content`}
                className="w-full transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all max-w-[460px]"
              >
                <div className="flex justify-end p-3">
                  <button
                    data-testid={`${data?.username}-close-button`}
                    onClick={closeModal}
                    className="p-2"
                  >
                    <IconClose height={18} width={18} />
                  </button>
                </div>

                <div className="p-5 pt-0">
                  <div className="relative">
                    <button
                      data-testid={`${data?.username}-copy-button`}
                      className="absolute top-2 right-2"
                      onClick={onCopy}
                    >
                      {hasCopied ? (
                        <IconCheckFilled
                          data-testid={`${data?.username}-copied-icon`}
                          className="text-emerald-400"
                        />
                      ) : (
                        <IconCopy data-testid={`${data?.username}-copy-icon`} />
                      )}
                    </button>
                    <div className="rounded-md p-2 overflow-auto bg-slate-100 max-h-[450px]">
                      <pre>
                        <code>{JSON.stringify(data, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
