import React, { useState, useEffect } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import ResumeForm from "./ResumeForm"

const axios = require('axios').default

const AddResume = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const [data, setData] = useState({
    title: "",
    description: "",
    file: "",
  })

  useEffect(() => {
    if (location.state) {
      const { title, description, file } = location.state.resume
      setData({
        title: title,
        description: description,
        file: file
      })
    } else {
      getResume()
    }
  }, [])

  function getResume() {
    axios.get('http://localhost:8080/resume/' + id)
    .then(res => {
      const { title, description, file } = res.data
      setData({
        title: title,
        description: description,
        file: file
      })
    })
    .catch(e => console.log(e))
  }

  function updateResume() {
    let resumeForm = new FormData()
    resumeForm.append("title", data.title)
    resumeForm.append("description", data.description)
    resumeForm.append("file", data.file)

    axios({
      method: "PUT",
      url: "http://localhost:8080/resume/" + id,
      data: resumeForm
    })
    .then(res => {
      console.log(res)
      navigate("/")
    })
  }

  return (
    <>
      <ResumeForm data={data} setData={setData} submitForm={updateResume} buttonLabel={"UPDATE POST"} />
    </>
  )
}

export default AddResume
