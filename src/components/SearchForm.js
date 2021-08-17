import React, { useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { set_search_term } = useGlobalContext();
  const search_value = React.useRef('');

  const search_cocktail = () => {
    set_search_term(search_value.current.value);
  }

  const handle_submit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    search_value.current.focus();
  }, [])

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handle_submit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text" id="name" ref={search_value} onChange={search_cocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
