import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ContextState = {
  sizeContent: boolean,
  mrg: number,
  isMobile: boolean,
  handleResizeContent: (n: string) => void,
  activeArrow: number,
  handleArrow: (n: number) => void,
  typeExplore: number,
  handleTypeExplore: (n: number) => void,
  titlePage: string,
  typeSearch: string,
  value: string,
  handleSubmit: (v: string) => void,
};

const IContext: ContextState = {
  sizeContent: false,
  mrg: 0,
  isMobile: false,
  handleResizeContent: () => {},
  activeArrow: 0,
  handleArrow: () => {},
  typeExplore: 0,
  handleTypeExplore: () => {},
  titlePage: '',
  typeSearch: 'home',
  value: '',
  handleSubmit: () => {}
}

export const Context = createContext<ContextState>(IContext);


export const ContextProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const [sizeContent, setSizeContent] = useState<boolean>(window.innerWidth < 720 ? false : true);
  const [mrg, setmrg] = useState<number>(200);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 720 ? true : false);
  const [activeArrow, setActiveArrow] = useState<number>(location.pathname === '/multisearch' ? 4 : 0);
  const [typeExplore, setTypeExplor] = useState<number>(0);
  const [titlePage, setTitlePage] = useState<string>(location.pathname === '/multisearch' ? 'MultiSearch' : 'New Releases');
  const [typeSearch, setTypeSearch] = useState<string>(location.pathname === '/multisearch' ? 'multisearch' : 'home');
  const [value, setValue] = useState<string>('new');

  const handleResizeContent = (n: string) => {
    setSizeContent(n === '0' ? true : false);
  };

  const handleMobile = () => {
    setIsMobile(window.innerWidth < 720 ? true : false);
  }

  const handleArrow = (n: number) => {
    setActiveArrow(n);
  }

  const handleTypeExplore = (n: number) => {
    setTypeExplor(n);
    setActiveArrow(0);
  }

  const handleSubmit = async (v: string) => {
    setValue(v);
  }

  useEffect(() => {
    setTypeSearch(
      typeExplore === 0 && activeArrow === 0 ? 'home' : 
      typeExplore === 0 && activeArrow === 1 ? 'arecoming' :
      typeExplore === 0 && activeArrow === 2 ? 'trending' : 
      typeExplore === 0 && activeArrow === 3 ? 'popular' : 
      typeExplore === 0 && activeArrow === 4 ? 'multisearch' : 

      typeExplore === 1 && activeArrow === 0 ? 'discovertv' : 
      typeExplore === 1 && activeArrow === 1 ? 'toprated' : 
      typeExplore === 1 && activeArrow === 2 ? 'trending' : 
      typeExplore === 1 && activeArrow === 3 ? 'popular' : 
      typeExplore === 1 && activeArrow === 4 ? 'multisearch' : 
      ''
    );
    setTitlePage(
      typeExplore === 0 && activeArrow === 0 ? 'New Releases' : 
      typeExplore === 0 && activeArrow === 1 ? 'Coming Soon' :
      typeExplore === 0 && activeArrow === 2 ? 'Trending' : 
      typeExplore === 0 && activeArrow === 3 ? 'Popular' : 
      typeExplore === 0 && activeArrow === 4 ? 'Multi Search' : 
      typeExplore === 1 && activeArrow === 0 ? 'Discover Series' : 
      typeExplore === 1 && activeArrow === 1 ? 'Top Rated' : 
      typeExplore === 1 && activeArrow === 2 ? 'Trending' : 
      typeExplore === 1 && activeArrow === 3 ? 'Popular' : 
      typeExplore === 1 && activeArrow === 4 ? 'Multi Search' : 
      ''
    );
  }, [activeArrow, typeExplore])

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
        typeExplore,
        handleTypeExplore,
        titlePage,
        typeSearch,
        value,
        handleSubmit
      }}
    >
      { children }
    </Context.Provider>
  )
}