import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [search_term, set_search_term] = useState('a');
  const [cocktails, set_cocktails] = useState([]);

  const fetch_drinks = useCallback(async () => {
    try {
      const response = await fetch(`${url}${search_term}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        const new_cocktails = drinks.map(item => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          }
        })
        set_cocktails(new_cocktails);
        
      } else {
        set_cocktails([]);
      }
      setLoading(false);

    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }, [search_term]);

  useEffect(() => {
    fetch_drinks();
  }, [search_term, fetch_drinks])

  return (
    <AppContext.Provider value={{
      loading,
      search_term,
      cocktails,
      set_search_term
    }}>
      {children}
    </AppContext.Provider>
  )

}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
