import React, { useState, useEffect } from "react"
import "../styles/ResumeForm.css"

const ResumeForm = (props) => {
  
  const handleChange = (name, e) => {
    const value = (name === "file" ? e.target.files[0] : e.target.value)
    props.setData({ ...props.data, [name]: value})
  }

  return (
    <div className="resume-form">
      <span className="form-title">New resume for critique</span>
      <div className="resume-inputs w-50">
        <label className="input-label">
        <span className="input-header">Title</span>
          <input 
            className="form-control"
            placeholder="ex. Seeking software developer internship"
            type="text"
            maxLength="140"
            name="title"
            value={props.data.name}
            onChange={e => handleChange("title", e)} 
          />
        </label>
        <label className="input-label">
          <span className="input-header">Description</span>
          <textarea
            className="form-control description"
            placeholder="Add any details you would like to share about your resume..."
            type="text"
            name="description"
            value={props.data.description}
            onChange={e => handleChange("description", e)}
          />
        </label>
        <select 
          className="form-select"
        >
          <option disabled selected>Choose the field of jobs you are applying for</option>
        </select>
        <label className="input-label">
          <div className="input-header">Upload Resume</div>
          <input 
            type="file"
            accept=".pdf"
            name="file"
            onChange={e => handleChange("file", e)}
          />
        </label>
        <button type="submit" className="btn btn-success submit"><b>{props.buttonLabel}</b></button>
      </div>
    </div>
  )
}

export default ResumeForm
