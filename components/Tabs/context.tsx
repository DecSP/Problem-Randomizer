import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type TabsContextValue = {
  value?: string
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const TabsContextProvider = ({
  children,
  value: propValue,
  onValueChange,
}: {
  children: ReactNode
  value?: string
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void
}) => {
  const [value, setValue] = useState<string>()

  useEffect(() => {
    if (!value && propValue) {
      setValue(propValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue])

  return (
    <TabsContext.Provider value={{ value, setValue, onValueChange }}>
      {children}
    </TabsContext.Provider>
  )
}

const useTabsContext = () => useContext(TabsContext) as TabsContextValue

export {
  TabsContext,
  TabsContextProvider,
  useTabsContext,
  type TabsContextValue,
}
