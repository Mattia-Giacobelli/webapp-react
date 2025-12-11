import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function MoviePage() {

    //Create single movie variable
    const [movie, setMovie] = useState({})

    //Take id from route params
    const { id } = useParams()

    //Ajax call for single movie
    function getSingleMovie() {
        axios.get(`http://localhost:3000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
                console.log(res.data);

            })
    }


    //Use effect make ajax call on page load
    useEffect(getSingleMovie, [])

    return (
        <>
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
        </>
    )
}