import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/AddResume.css"
import 'bootstrap/dist/css/bootstrap.css'

const AddResume = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    field: 0,
    file: "",
  })

  const handleChange = (name, e) => {
    const value = name === "file" ? e.target.files[0] : e.target.value
    setData({ ...data, [name]: value})
  }

  return (
    <div className="resume-form w-50"> 
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
        <input 
          className="form-control"
          placeholder="ex. Seeking software developer internship"
          type="text"
          name="title"
          value={data.name}
          onChange={e => handleChange("title", e)} 
        />
      </div>
      <div className="input-group mb-3" style={{ border }}>
        <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
        <input 
          type="text"
          name="description"
          value={data.description}
          onChange={e => handleChange("text", e)}
        />
      </div>
      <input 
        type="file"
        accept=".pdf"
        name="file"
        onChange={e => handleChange("file", e)}
      />
    </div>
  )
}

export default AddResume
