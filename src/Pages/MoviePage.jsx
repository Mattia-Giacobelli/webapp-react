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

    //Create form content varibles
    const [name, setName] = useState("")
    const [vote, setVote] = useState("")
    const [text, setText] = useState("")
    const [formData, setFormData] = useState({})



    //Ajax call for single movie
    function getSingleMovie() {
        axios.get(`http://localhost:3000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
                console.log(res.data);

            })
            .finally(() => setLoading(false))
    }


    //Jandle Form submit

    function handleSubmit(e) {
        e.preventDefault()

        const formDataUpdate = {
            movie_id: id,
            name: name,
            vote: vote,
            text: text
        }

        setFormData(formDataUpdate)


        axios.post(`http://localhost:3000/api/movies/${id}/reviews`, formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
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

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Your name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vote" className="form-label">Vote</label>
                            <input
                                type="number"
                                name="vote"
                                id="vote"
                                className="form-control"
                                placeholder="Your vote"
                                value={vote}
                                onChange={e => setVote(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">Review</label>
                            <textarea rows="4"
                                name="text"
                                id="text"
                                className="form-control"
                                placeholder="Write you review here"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Submit Review</button>
                    </form>


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