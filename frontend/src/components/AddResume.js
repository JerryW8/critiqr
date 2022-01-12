import React, { useState, useEffect } from "react"
import ResumeForm from "./ResumeForm"

const AddResume = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    field: 0,
    file: "",
  })

  return (
    <>
      <ResumeForm data={data} setData={setData} buttonLabel={"CREATE POST"} />
    </>
  )
}

export default AddResume
