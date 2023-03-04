const PokemonList = ({ title, url }) => {
    return ( 
        <div className="pokemon">
            <h3>{title}</h3>
            <a href={url}>{url}</a>
        </div>
     );
}
 
export default PokemonList;