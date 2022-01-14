import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/ResumeList.css"
import 'bootstrap/dist/css/bootstrap.css'

const axios = require('axios').default

const ResumeList = props => {
  const [resumes, setResumes] = useState([])
  const [field, setField] = useState(0)
  const [query, setQuery] = useState("")

  const fields = [
    "Arts",
    "Business",
    "Engineering",
    "Finance",
    "Health",
    "Science",
    "Software",
    "Social Science",
    "Humanities",
    "Other"
  ]

  useEffect(() => {
    console.log("rerendered")
    getAllResumes()
  }, [])

  function getAllResumes() {
    axios.get("http://localhost:8080/resume/")
      .then(res => {
        console.log(res)
        setResumes(res.data)
      })
      .catch(e => { console.log(e) })
  }

  function searchResumes(q) {
    axios.get("http://localhost:8080/resume/?q=" + q)
    .then(res => {
      console.log(res)
      setResumes(res.data)
    })
    .catch(e => { console.log(e) })
  }

  function filterByField(i) {
    console.log('hi')
    axios.get("http://localhost:8080/resume/?field=" + i)
    .then(res => {
      console.log(i)
      console.log(res.data)
      setResumes(res.data)
    })
    .catch(e => { console.log(e) })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      searchResumes(query)
    }
  }

  return (
    <div>
      <div>
        <input 
          type="input" 
          className="search-bar" 
          placeholder="Seach (ex. Software developer resume)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
      </div>
      <div className="select-bar card w-50">
        <div className="card-body">
          <span className="field-title">Filter by field</span>
          <div className="fields">
            {fields.map((field, i) => 
              <button 
                className="field-tag bg-primary" 
                key={i} 
                onClick={() => filterByField(i)}
              >
                {field}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="resume-list">
        {resumes.length ? (
          resumes.map((resume, i) => {
            return (
                <div className="card w-50 resume-card" key={i}>
                  <Link 
                    to={`/resumes/${resume._id}`} 
                    state={resume}
                    className="resume-title"
                  >
                    <div className="card-body">
                      <h5 className="card-title">{resume.title}</h5>
                    </div>
                  </Link>
                </div>
              )
            })
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  )
}

export default ResumeList
