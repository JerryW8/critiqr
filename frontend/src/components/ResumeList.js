import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/ResumeList.css"
import 'bootstrap/dist/css/bootstrap.css'

const ResumeList = props => {
  const [resumes, setResumes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [field, setField] = useState(0)

  return (
    <div>
      <div>
        <input type="input" className="search-bar" placeholder="Seach (ex. Software developer resume)"></input>
      </div>
      <div className="resume-list">
        <div className="card w-50 resume-card">
          <div className="card-body" style={{ textAlign: "left" }}>
            <h5 className="card-title">Card title</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeList
