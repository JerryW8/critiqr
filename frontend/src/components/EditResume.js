import React, { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import ResumeForm from "./ResumeForm"

const axios = require('axios').default

const AddResume = () => {

  const { id } = useParams()
  const location = useLocation()

  const [data, setData] = useState({
    title: "",
    description: "",
    field: 0,
    file: "",
  })

  useEffect(() => {
    if (location.state) {
      const { title, description, field, file } = location.state.resume
      setData({
        title: title,
        description: description,
        field: field,
        file: file
      })
    } else {
      getResume()
    }
  }, [])

  function getResume() {
    axios.get('http://localhost:8080/resume/' + id)
    .then(res => {
      const { title, description, field, file } = res.data
      setData({
        title: title,
        description: description,
        field: field,
        file: file
      })
    })
    .catch(e => console.log(e))
  }

  return (
    <>
      <ResumeForm data={data} setData={setData} buttonLabel={"CREATE POST"} />
    </>
  )
}

export default AddResume
