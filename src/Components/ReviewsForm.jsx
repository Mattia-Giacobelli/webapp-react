import axios from "axios"
import { useEffect, useState } from "react"

export default function ReviewsForm({ movieId, refreshMovies }) {

    //Create form content varibles
    const [name, setName] = useState("")
    const [vote, setVote] = useState("1")
    const [text, setText] = useState("")
    const [pageError, setPageError] = useState('')
    let error

    function handleFormReviewSubmit(e) {

        e.preventDefault()

        const formDataUpdate = {
            name: name,
            vote: vote,
            text: text
        }

        axios.post(`http://localhost:3000/api/movies/${movieId}/reviews`, formDataUpdate)
            .then(res => {
                console.log(res);
                if (res.data.status === 400) {
                    setPageError(res.data.error)
                    error = res.data.error
                    console.log(error);
                } else if (res.status === 201) {
                    setPageError('')
                    error = ''
                    console.log(error);
                }

            })

            .finally(() => {
                setName("")
                setVote("1")
                setText("")
                if (error != '') {
                } else if (error === '') {
                    refreshMovies()
                }
                console.log(error);
            })

    }

    return (
        <>
            {pageError != '' ? <h5>{pageError}</h5> : <> </>}
            <form onSubmit={handleFormReviewSubmit}>
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
                    <select name="vote" id="vote" className="form-select"
                        value={vote} onChange={e => setVote(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
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
                <button className="btn btn-dark" type="submit">Submit Review</button>
            </form>
        </>
    )
}

