import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/ResumeForm.css"
import "../styles/Resume.css"

const axios = require('axios').default

const Resume = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [resume, setResume] = useState({})
  const [reviewText, setReviewText] = useState("")

  useEffect(() => {
    getResume()
  }, [])

  function getResume() {
    axios.get('http://localhost:8080/resume/' + id)
      .then(res => {
        console.log(res.data)
        setResume(res.data)
      })
      .catch(e => console.log(e))
  }

  function deleteResume() {
    axios.delete('http://localhost:8080/resume/' + id)
    .then(res => {
      console.log(res.data)
    })
    .then(() => {
      // go back to home page 
      navigate("/")
    })
    .catch(e => console.log(e))
  }

  function deleteReview(reviewID) {
    axios.delete(`http://localhost:8080/resume/${id}/review/${reviewID}`)
    .then(res => {
      console.log(res.data)
      setResume(prev => {
        console.log(reviewID)
        return({
          ...prev,
          reviews: prev.reviews.filter(r => r._id !== reviewID)
        })
      })
    })
    .catch(e => console.log(e))
  }

  function postReview() {
    axios.post(`http://localhost:8080/resume/${id}/review/`, {
      text: reviewText
    })
    .then(res => setResume({...res.data}))
    .catch(e => console.log(e))
  }

  function resumeLink() {
    axios.get('http://localhost:8080/resume/file/' + resume.key)
    .then(res => {
      console.log(res.data)
      console.log(res.data.url)
      window.open(res.data.url, '_blank')
    })
    .catch(e => { console.log(e) })
  }

  function handleReviewPost() {
    const review = {
      text: reviewText
    }
    setReviewText("")
    postReview(review)
  }

  return (
    <div className="resume-post">
      <div className="card">
        <div className="card-body">
          <span className="title">{resume.title}</span>
          <p className="post-body">
            {resume.description}
          </p>
          <div className="action-buttons">
            <button className="btn btn-success" onClick={resumeLink}>
              <b>View Resume</b>
            </button>
            <div className="edit-delete">
              <Link to={`/resumes/${id}/edit`} state={{ resume: resume }} className="edit btn btn-primary">
                <b>Edit</b>
              </Link>
              <button className="delete btn btn-danger" onClick={deleteResume}>
                <b>Delete</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <span className="title">Leave a critique</span>
          <textarea 
            className="form-control comment"
            placeholder="How to improve this resume?"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleReviewPost}><b>POST</b></button>
        </div>
      </div>
      <div className="critiques">
        <div className="card">
          <div className="card-body">
            <span className="title">Critiques ({resume.reviews && resume.reviews.length})</span>
            <hr />
            {resume.reviews && resume.reviews.map((review, i) => {
              return (
                <div key={i}>
                    <div className="delete-review">
                      <button className="btn btn-sm btn-danger" onClick={() => deleteReview(review._id)}>
                        Delete
                      </button>
                    </div>
                    <p>{review.text}</p>
                  <hr />
                </div>
              )})
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
