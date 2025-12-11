import { useEffect } from "react"
import { useMovies } from "../Contexts/MoviesContext"



export default function HomePage() {

    //Use context variables
    const { movies, getMovies } = useMovies()


    //Get movies list on page load
    useEffect(getMovies, [])

    return (
        <>
            <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-6">

            </div>
        </>
    )
}



