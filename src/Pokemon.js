const Pokemon = ({ name, src }) => {
    return ( 
        <div className="pokemon">
            <h3>{name}</h3>
            <img src= {src} alt="" />
        </div>
     );
}
 
export default Pokemon;