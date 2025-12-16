import { useEffect } from "react"
import { useMovies } from "../Contexts/MoviesContext"
import { Link } from "react-router-dom"
import { ChaoticOrbit } from 'ldrs/react'
import 'ldrs/react/ChaoticOrbit.css'



export default function HomePage() {

    //Use context variables
    const { movies, getMovies, loading } = useMovies()


    //Get movies list on page load
    useEffect(getMovies, [])

    return (
        <>
            {loading ?
                <div className="loader">
                    <div>
                        <ChaoticOrbit
                            size="35"
                            speed="1.5"
                            color="black"
                        />
                    </div>
                </div>
                :
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
                        {movies.map(movie => {
                            return (
                                <div key={movie.id} className="col">
                                    <Link to={`/${movie.id}`}>
                                        <div className="card" >
                                            <img src={`http://localhost:3000/img/movies_cover/${movie.image}`} alt="movie-cover"
                                                className="card-img-top" />
                                            <div className="text">
                                                <h4>
                                                    {movie.title}
                                                </h4>
                                                <span>{movie.genre}</span>
                                                <p>{movie.abstract}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}



