import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ResumeForm from "./ResumeForm"

const axios = require('axios').default

const AddResume = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({
    title: "",
    description: "",
    field: 0,
    file: "",
  })

  function createResume() {
    let resumeForm = new FormData()
    resumeForm.append("title", data.title)
    resumeForm.append("description", data.description)
    resumeForm.append("field", 0)
    resumeForm.append("file", data.file)

    axios({
      method: "POST",
      url: "http://localhost:8080/resume/",
      data: resumeForm
    })
    .then(res => {
      console.log(res.data)
      navigate("/")
    })
    .catch(e => { console.log(e) })

    // fetch("http://localhost:8080/resume/", {
    //   method: "POST",
    //   body: resumeForm
    // })
    // .then(res => {
    //   console.log(res)
    //   navigate("/")
    // })
    // .catch(e => { console.log(e) })
  }

  return (
    <>
      <ResumeForm data={data} setData={setData} submitForm={createResume} buttonLabel={"CREATE POST"} />
    </>
  )
}

export default AddResume
