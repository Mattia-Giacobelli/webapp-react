import axios from "axios";
import { createContext, useContext, useState } from "react";

const MoviesContext = createContext()

function MoviesProvider({ children }) {

    //Create movies variable
    const [movies, setMovies] = useState([])


    //Ajax call for movies
    function getMovies() {

        axios.get('http://localhost:3000/api/movies/')
            .then(res => {
                setMovies(res.data)
            })
    }


    return (
        <MoviesContext.Provider
            value={{ movies, getMovies }}>
            {children}
        </MoviesContext.Provider>S
    )
}

function useMovies() {
    const context = useContext(MoviesContext);
    return context
}

export { MoviesProvider, useMovies }