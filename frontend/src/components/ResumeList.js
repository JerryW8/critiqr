import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/ResumeList.css"
import 'bootstrap/dist/css/bootstrap.css'
import { TiDelete } from "react-icons/ti"

const axios = require('axios').default

const ResumeList = props => {
  const [resumes, setResumes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [field, setField] = useState(0)
  const [query, setQuery] = useState("")

  useEffect(() => {
    getAllResumes()
  }, [])

  function getAllResumes() {
    axios.get("http://localhost:8080/resume/")
      .then(res => {
        console.log(res)
        setResumes(res.data)
      })
  }

  function searchResumes(q) {
    axios.get("http://localhost:8080/resume/?q=" + q)
      .then(res => {
        console.log(res)
        setResumes(res.data)
      })
  }

  function deleteResume(resumeId, index) {
    axios.delete("http://localhost:8080/resume/" + resumeId)
      .then(res => {
        setResumes(prev => {
          prev.splice(index, 1)
          return ({
            ...prev
          })
        })
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
      <div className="resume-list">
        {resumes.length ? (
          resumes.map((resume, i) => {
            return (
                <div className="card w-50 resume-card" key={i}>
                  <Link 
                    to={{ 
                      pathname: `/resumes/${resume._id}`, 
                      state: {
                        resume: resume
                      }
                    }}
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
