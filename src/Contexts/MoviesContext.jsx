import axios from "axios";
import { createContext, useContext, useState } from "react";

const MoviesContext = createContext()

function MoviesProvider({ children }) {

    //Create movies variable
    const [movies, setMovies] = useState([])

    //Create loader variable
    const [loading, setLoading] = useState(true)


    //Ajax call for movies
    function getMovies() {

        axios.get('http://localhost:3000/api/movies/')
            .then(res => {
                setMovies(res.data)
            })
            .finally(() => setTimeout(showLoader, 800))
    }


    //Set loader
    function showLoader() {
        setLoading(false)
    }






    return (
        <MoviesContext.Provider
            value={{
                movies, getMovies, loading, setLoading, showLoader
            }}>
            {children}
        </MoviesContext.Provider>
    )
}

function useMovies() {
    const context = useContext(MoviesContext);
    return context
}

export { MoviesProvider, useMovies }