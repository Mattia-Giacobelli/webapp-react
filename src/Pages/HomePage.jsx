import { useEffect } from "react"
import { useMovies } from "../Contexts/MoviesContext"



export default function HomePage() {

    //Use context variables
    const { movies, getMovies } = useMovies()


    //Get movies list on page load
    useEffect(getMovies, [])

    return (
        <>
            <div className="container">
                <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-6">
                    {movies.map(movie => {
                        return (
                            <div key={movie.id} className="col">
                                <div className="card" >
                                    <img src={`http://localhost:3000/img/movies_cover/${movie.image}`} alt="" />
                                    <h4>
                                        {movie.title}
                                    </h4>
                                    <span>{movie.genre}</span>
                                    <p>{movie.abstract}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}



