import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import Pagination from './Pagination';


function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState({})
  const [images, setImages] = useState({})
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [buttonText, setButtonText] = useState('Search')


  //FETCH

  useEffect(() => {
    setLoading(true)
    getPokemons()
  }, [currentPageUrl])


  useEffect(() => {
    if (query) {
      setButtonText("Back")
      setLoading(true)
      getPokemon()
    } else {
      setButtonText("Search")
    }
  }, [query])

  const getPokemons = async () => {
    const response = await fetch(currentPageUrl);
    const data = await response.json();
    setLoading(false)
    setNextPageUrl(data.next)
    setPreviousPageUrl(data.previous)
    setPokemons(data.results);
  }

  const getPokemon = async () => {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const data = await response.json();
    setLoading(false)
    const sprites = data.sprites
    setPokemon(data);
    setImages(sprites)
   
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    console.log(search)
    setQuery(search)
    setSearch('')
    
  }

  //PAGINATION

  const gotoNextpage = () => {
    setCurrentPageUrl(nextPageUrl)
  }

  const gotoPreviouspage = () => {
    setCurrentPageUrl(previousPageUrl)
  }

  //RETURN

  if (loading) return "Loading..."

  return (
    <div className="App">

      <h1>Pokemons</h1>
      <p>Find your favourite pokemon!</p>

      <form onSubmit={getSearch}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">{buttonText}</button>
      </form>

      {!query &&
        <div>
          <div className="pokemons">
          {pokemons.map(pokemon => (
            <PokemonList
              key={pokemon.name}
              title={pokemon.name}
              url={pokemon.url}
            />
          ))}
          </div>
          
            <Pagination 
            gotoNextpage={nextPageUrl ? gotoNextpage : null}
            gotoPreviouspage={previousPageUrl ? gotoPreviouspage : null}/>
          
        </div>

      }


      {query &&

        <div className="onePokemon">

          <Pokemon
            key={pokemon.name}
            name={pokemon.name}
            src={images.back_default}
          />
        </div>
      }


    </div>


  );
}

export default App;