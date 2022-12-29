import { createContext, useState } from "react";

export const SettingsContext = createContext({
  showBottomBar: true,
  setShowBottomBar: () => null,
  language: 'indonesia',
  gLoading: false,
  setGLoading: () => null
})


export function SettingsProvider({children}) {
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [language, setLanguage] = useState('id')
  const [gLoading, setGLoading] = useState(false)

  const value = {
    showBottomBar,
    setShowBottomBar: setShowBottomBar,
    language,
    setLanguage,
    gLoading,
    setGLoading
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
