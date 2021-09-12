import { createContext, useState, useEffect } from 'react';

type ContextState = {
  sizeContent: boolean,
  mrg: number,
  isMobile: boolean,
  handleResizeContent: (n: string) => void,
  activeArrow: number,
  handleArrow: (n: number) => void,
};

const IContext: ContextState = {
  sizeContent: false,
  mrg: 0,
  isMobile: false,
  handleResizeContent: () => {},
  activeArrow: 0,
  handleArrow: () => {},
}

export const Context = createContext<ContextState>(IContext);


export const ContextProvider: React.FC = ({ children }) => {
  const [sizeContent, setSizeContent] = useState<boolean>(window.innerWidth < 720 ? false : true);
  const [mrg, setmrg] = useState<number>(200);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 720 ? true : false);
  const [activeArrow, setActiveArrow] = useState<number>(0);

  const handleResizeContent = (n: string) => {
    setSizeContent(n === '0' ? true : false);
  };

  const handleMobile = () => {
    setIsMobile(window.innerWidth < 720 ? true : false);
  }

  const handleArrow = (n: number) => {
    setActiveArrow(n);
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
        isMobile,
        activeArrow,
        handleArrow,
      }}
    >
      { children }
    </Context.Provider>
  )
}