import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChaoticOrbit } from 'ldrs/react'
import 'ldrs/react/ChaoticOrbit.css'


export default function MoviePage() {

    //Create single movie variable
    const [movie, setMovie] = useState({})

    //Take id from route params
    const { id } = useParams()

    //Create loader variable
    const [loading, setLoading] = useState(true)

    //Ajax call for single movie
    function getSingleMovie() {
        axios.get(`http://localhost:3000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
                console.log(res.data);

            })
            .finally(() => setLoading(false))
    }


    //Use effect make ajax call on page load
    useEffect(getSingleMovie, [])



    return (
        <>
            <div className="container d-flex justify-content-between">
                <div key={movie.id} className="my-card" >
                    <div className="img-container d-flex justify-content-center">
                        <img src={`http://localhost:3000/img/movies_cover/${movie.image}`} alt="" />
                    </div>
                    <h2>
                        {movie.title}
                    </h2>
                    <span>{movie.genre}</span>
                    <p>{movie.abstract}</p>
                </div>
                <div className="my-card">
                    <h4>Ratings</h4>
                    {loading ?
                        <ChaoticOrbit
                            size="35"
                            speed="1.5"
                            color="black"
                        />
                        :
                        movie.reviews.map(review =>
                            <div key={review.id} className="review" >
                                <div className="d-flex justify-content-between">
                                    <div >{review.name}</div>
                                    <div >{`${review.vote}⭐`}</div>
                                </div>
                                <div className="text" >{review.text}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}