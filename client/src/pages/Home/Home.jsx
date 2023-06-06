import { BackImage, Header, ActionsContainer, MainContainer, CardsContainer, FilterOrderContainer } from "./styled.components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar"
import Loader from "../../components/Loader/Loader";
import {
    getAllPokemons,
    filteredPokemons,
    orderedPokemons,
    loadTypes,
} from "../../redux/actions/actions";

const Home = (props) => {
    // const pokemons = useSelector((state) => state.pokemons);

    const dispatch = useDispatch();
    
    
    // Estadp global para todos los tipos
    const types = useSelector((state) => state.types);
    
    // Estadp lcaol para el loader 
    const [isLoading, setIsLoading] = useState(true);
    
    // Estados locales Filtrado y Ordenamiento
    const [typeFilter, setTypeFilter] = useState("All");
    const [originFilter, setOriginFilter] = useState("Any");
    const [alphabeticOrder, setAlphabeticOrder] = useState("NoOrder");
    const [attackOrder, setAttackOrder] = useState("NoOrder");

    /* --- ESTADOS LOCALES del PAGINADOR --- */
    // Los utilizo para controlar el numero de pagina actual y el tamaño de la página. 
    const [currentPage, setCurrentPage] = useState(1);  // "currentPage" representa la pagina actual y se inicializa en 1.
    const [pageSize] = useState(12); // "pageSize" representa la cantidad de Cards que se muestran por pagina y se inicializa en 12.


    // Carga de datos antes de renderizar
    useEffect(() => {
        // setIsLoading(true);
        dispatch(loadTypes());
        dispatch(getAllPokemons())
        //evita que se haga el dispatch de filteredPokemons antes de tener los pokemones
        .then(() => {
            dispatch(filteredPokemons());
            setIsLoading(false);
        });
        setCurrentPage(1)
    }, [dispatch]);

    /* --- FUNCION getPokemonsByPage --- */
    // Creo una funcion que toma como parametros una lista de Pokemons ("pokemons"), el numero de pagina actual ("pageNumber") y el tamaño de la pagina ("pageSize").
    // Calcula los indices de inicio ("startIndex") y fin ("endIndex") para luego retornar la porcion correspondiente de la lista de pokemons ("pokemons") utilizando slice(), pasandole como parametros "startIndex" y "endIndex"
    // Por ejemplo, si pageNumber es 2 y pageSize es 10, la función devolverá los elementos del índice 10 al 19 de la lista pokemons.
    const getPokemonsByPage = (pokemons, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return pokemons.slice(startIndex, endIndex);
    };

    /* --- CALCULO del NUMERO de PAGINAS --- */
    // Llenado de paginas segun largo de la lista...
    // Creo 2 variables "pageCount" y "orderedPageCount", en donde calculo el numero total de paginas que necesito para mostrar todos los Pokenons en función del tamaño de la lista filtrada u ordenada y el tamaño de la página. Esto lo hago usando la funcion Math.ceil para redondear hacia arriba y asegurarme que se muestren todas las paginas que necesarias.
    // Por ejemplo, si hay 30 Pokemons en la lista filtrada u ordenada y el tamaño de pagina es 10, se necesitarán 3 páginas para mostrar todos los Pokemons.
    const pageCount = Math.ceil(props.filteredPokemons.length / pageSize);
    // const orderedPageCount = Math.ceil(props.orderedPokemons.length / pageSize);

    /* --- CREACION de ARRAYS de NUMEROS de PAGINA (BUTTONS) --- */
    // Creo 2 arrays, pages y orderedPages, que contienen los numeros de pagina correspondientes a las listas filtradas y ordenadas, los cuales se utilizan luego para generar los buttons de la paginacion.
    // Por ejemplo, si hay 3 paginas en la lista filtrada, el array pages contendrá [1, 2, 3].
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    // const orderedPages = [];
    // for (let i = 1; i <= orderedPageCount; i++) {
    //     orderedPages.push(i);
    // }

    /* --- LISTAS PAGINADAS --- */
    // Obtengo las listas de Pokemons paginadas a partir de las listas filtradas y ordenadas, mediante el uso de mi funcion previamente creada "getPokemonsByPage"
    // Por ejemplo, si la pagina actual es 2 y el tamaño de pagina es 10, se obtendrán los elementos del índice 10 al 19 de la lista props.orderedPokemons y props.filteredPokemons.
    const orderedListPages = getPokemonsByPage(
        props.orderedPokemons,
        currentPage,
        pageSize
    );
    
    const filteredListPages = getPokemonsByPage(
        props.filteredPokemons,
        currentPage,
        pageSize
    );

    // Creo esta funcion para cambiar la pagina actual cuando hago click en un Button de mi paginacion. Basicamente actualiza el estado de currentPage con el numero de pagina clickeado.
    // Por ejemplo, si se hace clic en el botón de página 3, la página actual se actualizará a 3.
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleTypeFilterChange = (event) => {
        setTypeFilter(event.target.value);
        dispatch(filteredPokemons({ type: event.target.value, origin: originFilter }));
        dispatch(orderedPokemons(alphabeticOrder));
        setCurrentPage(1);
    };

    const handleOriginFilterChange = (event) => {
        setOriginFilter(event.target.value);
        dispatch(filteredPokemons({ type: typeFilter, origin: event.target.value }));
        dispatch(orderedPokemons(alphabeticOrder));
        setCurrentPage(1);
    };

    const handleAlfabeticOrderChange = (event) => {
        setAlphabeticOrder(event.target.value);
        setAttackOrder("NoOrder");
        dispatch(orderedPokemons(event.target.value));
        dispatch(filteredPokemons({ type: typeFilter, origin: originFilter }));
        setCurrentPage(1);
    };

    const handleAttackOrderChange = (event) => {
        setAttackOrder(event.target.value);
        setAlphabeticOrder("NoOrder");
        dispatch(orderedPokemons(event.target.value));
        dispatch(filteredPokemons({ type: typeFilter, origin: originFilter }));
        setCurrentPage(1);
    };

    return (
        <BackImage>
            <MainContainer>
                {/* Header */}
                <Header>
                    <ActionsContainer>
                        <SearchBar />   
                        <FilterOrderContainer>
                            <label className="labels" htmlFor="">
                                Filter by Type:
                            </label>
                            <select
                                className="filter"
                                name="type"
                                id="typeFilter"
                                onChange={handleTypeFilterChange}
                            >
                            <option value="All">All</option>
                            {
                                types
                                    ? types.map((type) => (
                                        <option value={type.name} key={type.id}>
                                        {type.name}
                                        </option>
                                    ))
                                    : null
                            }
                            </select>
                            <label className="labels" htmlFor="">
                                Filter by Origin:{" "}
                            </label>
                            <select
                                className="filter"
                                name="origin"
                                id="originFilter"
                                onChange={handleOriginFilterChange}
                            >
                                <option value="Any">All</option>
                                <option value="Api">Api</option>
                                <option value="Database">Database</option>
                            </select>

                            <label className="labels" htmlFor="">
                                Sort Alphabetically:{" "}
                            </label>
                            <select
                                className="filter"
                                name="orderName"
                                value={alphabeticOrder}
                                onChange={handleAlfabeticOrderChange}
                            >
                                <option value="NoOrder">Don't sort</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                            <label className="labels" htmlFor="">
                                Sort by Attack:{" "}
                            </label>
                            <select
                                className="filter"
                                name="orderAttack"
                                value={attackOrder}
                                onChange={handleAttackOrderChange}
                            >
                                <option value="NoOrder">Don't sort</option>
                                <option value="Asc">Low to high</option>
                                <option value="Desc">High to low</option>
                            </select>
                            <br />
                            <br />
                        </FilterOrderContainer>
                        <NavLink to="/create">
                            Create your Pokemon
                        </NavLink>
                    </ActionsContainer>
                </Header>
                <CardsContainer>
                    {isLoading ? (
                        <Loader>&nbsp;</Loader>
                        ) : (
                            props.orderedPokemons.length > 0 ? (
                                orderedListPages.map((pokemon) => (
                                <div>
                                    <Card
                                        key={pokemon.id}
                                        id={pokemon.id}
                                        name={pokemon.name}
                                        image={pokemon.image}
                                        types={pokemon.types}
                                    />
                                </div>
                                ))
                            ) : (
                                filteredListPages.map((pokemon) => (
                                <div>
                                    <Card
                                        key={pokemon.id}
                                        id={pokemon.id}
                                        name={pokemon.name}
                                        image={pokemon.image}
                                        types={pokemon.types}
                                    />
                                </div>
                                ))
                            )
                        )
                    }
                    
                </CardsContainer>

                <nav>
                    <ul className="pagination">
                    <button
                        className="page-item"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <span className="page-link">&lt;&lt;</span>
                    </button>
                    <button
                        className="page-item"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span className="page-link"> Prev </span>
                    </button>
                        {
                            pages.map((page) => (
                                <button
                                    key={page}
                                    className={page === currentPage ? "page-item active" : "page-item"}
                                    onClick={() => handlePageChange(page)}
                                >
                                    <span href="" className="page-link">{page} </span>
                                </button>
                            ))     
                        }
                    <button
                        className="page-item"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pages.length}
                    >
                        <span className="page-link">Next</span>
                    </button>
                    <button
                        className="page-item"
                        onClick={() => handlePageChange(pages.length)}
                        disabled={currentPage === pages.length}
                    >
                        <span className="page-link">&gt;&gt;</span>
                    </button>

                    {/* Googlear al respecto del funcionamiento de este bloque de codigo, o decirle a alagunos de los chicos que me de una manito */}
                    {/* {
                        props.orderedPokemons.length > 0 ? (
                            orderedPages.map((page) => (
                                <button
                                    key={page}
                                    className={page === currentPage ? "page-item active" : "page-item"}
                                    onClick={() => handlePageChange(page)}
                                >
                                    <a className="page-link">{page}</a>
                                </button>
                            ))
                        ) : (
                            pages.map((page) => (
                                <button
                                    key={page}
                                    className={page === currentPage ? "page-item active" : "page-item"}
                                    onClick={() => handlePageChange(page)}
                                >
                                    <a className="page-link">{page}</a>
                                </button>
                            ))
                        )   
                    } */}
                    </ul>
                </nav>

            </MainContainer>
        </BackImage>
    )
}

//Traer estados globales para utilizar en la renderizacion
const mapStateToProps = (state) => {
    return {
      pokemons: state.pokemons,
      filteredPokemons: state.filteredPokemons,
      orderedPokemons: state.orderedPokemons,
    };
};

export default connect(mapStateToProps, null)(Home);

    


        // {/* BESTOOOOOO+OOOOOOOOOOOOOO */}
        //     {/* {
        //     props.orderedPokemons.length > 0 ? (
        //         props.orderedPokemons.map((pokemon) => (
        //         <div key={pokemon.id}>
        //             <Card
        //             id={pokemon.id}
        //             name={pokemon.name}
        //             image={pokemon.image}
        //             types={pokemon.types}
        //             />
        //         </div>
        //         ))
        //     ) : (
        //         originFilter === "Database"
        //         ? props.filteredPokemons.map((pokemon) => (
        //             <div key={pokemon.id}>
        //                 <Card
        //                 id={pokemon.id}
        //                 name={pokemon.name}
        //                 image={pokemon.image}
        //                 types={pokemon.types}
        //                 />
        //             </div>
        //             ))
        //         : props.pokemons.map((pokemon) => (
        //             <div key={pokemon.id}>
        //                 <Card
        //                 id={pokemon.id}
        //                 name={pokemon.name}
        //                 image={pokemon.image}
        //                 types={pokemon.types}
        //                 />
        //             </div>
        //             ))
        //     )
        //     } */}