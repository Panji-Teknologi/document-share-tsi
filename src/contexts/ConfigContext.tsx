import { ReactNode, createContext } from 'react';

// project import
import config from '@/config';
import useLocalStorage from '@/hooks/useLocalStorage';

// initial state
const initialState = {
  ...config,
  onChangeLocalization: () => { },
  onChangeMode: () => { },
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

type ConfigContextType = {
  fontFamily: string;
  i18n: string;
  menuOrientation: string;
  miniDrawer: boolean;
  container: boolean;
  mode: 'light' | 'dark';
  presetColor: string;
  themeDirection: string;
  onChangeLocalization: () => void;
  onChangeMode: () => void;
}

const ConfigContext = createContext({} as ConfigContextType);

function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useLocalStorage('tsi-config', initialState);

  const onChangeLocalization = (lang: string) => {
    setConfig({
      ...config,
      i18n: lang
    });
  };

  const onChangeMode = (mode: 'light' | 'dark') => {
    setConfig({
      ...config,
      mode
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLocalization,
        onChangeMode
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
