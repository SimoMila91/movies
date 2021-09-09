import { createContext, useState, useEffect } from 'react';

type ContextState = {
  sizeContent: boolean,
  mrg: number,
  isMobile: boolean,
  handleResizeContent: (n: string) => void;
};

const IContext: ContextState = {
  sizeContent: false,
  mrg: 0,
  isMobile: false,
  handleResizeContent: () => {},
}

export const Context = createContext<ContextState>(IContext);


export const ContextProvider: React.FC = ({ children }) => {
  const [sizeContent, setSizeContent] = useState<boolean>(false);
  const [mrg, setmrg] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResizeContent = (n: string) => {
    setSizeContent(n === '0' ? true : false);
  };

  const handleMobile = () => {
    setIsMobile(window.innerWidth < 720 ? true : false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleMobile);
  })

  useEffect(() => {
    setmrg(sizeContent && !isMobile ? 200 : 0);
  }, [sizeContent, isMobile])

  return (
    <Context.Provider
      value={{
        sizeContent, 
        handleResizeContent,
        mrg,
        isMobile
      }}
    >
      { children }
    </Context.Provider>
  )
}