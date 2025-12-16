import axios from "axios"
import { useMovies } from "../Contexts/MoviesContext"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChaoticOrbit } from 'ldrs/react'
import 'ldrs/react/ChaoticOrbit.css'
import ReviewsForm from "../Components/ReviewsForm"


export default function MoviePage() {

    //Create single movie variable
    const [movie, setMovie] = useState({})

    //Take id from route params
    const { id } = useParams()

    const { loading, showLoader, setLoading } = useMovies()




    //Ajax call for single movie
    function getSingleMovie() {
        setLoading(true)


        axios.get(`http://localhost:3000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
                console.log(res.data);
                console.log(loading);

            })
            .finally(() => {
                setTimeout(showLoader, 800)
            })
    }


    console.log(loading);

    //Cycle to render stars based on vote
    function getStars(maxVote) {
        const stars = []
        for (let i = 1; i <= maxVote; i++) {
            const item = <i key={i} className="bi bi-star-fill stars"></i>
            stars.push(item)
        }
        if (maxVote < 5) {
            for (let i = 1; i <= 5 - maxVote; i++) {
                const item = <i key={i + 5} className="bi bi-star stars"></i>
                stars.push(item)
            }
        }

        return stars
    }



    //Use effect to make the post call when form data contains data
    // useEffect(postReview, [formData])

    //Use effect make ajax call on page load
    useEffect(getSingleMovie, [])



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
                            <ReviewsForm movieId={id} refreshMovies={getSingleMovie} />
                        </div>
                    </div>
                    <div className="container">
                        {(!loading && movie.reviews != undefined) && movie.reviews.map(review =>
                            <div key={review.id} className="review" >
                                <div className="d-flex justify-content-between">
                                    <div >{review.name}</div>
                                    <div>
                                        <span>{review.vote}</span>
                                        <span>{getStars(review.vote).map(star => {
                                            return (
                                                star
                                            )
                                        })}
                                        </span>
                                    </div>
                                </div>
                                <div className="text" >{review.text}</div>
                            </div>
                        )
                        }
                    </div>
                </>
            }
        </>
    )
}