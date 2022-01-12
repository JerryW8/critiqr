import React, { useState, useEffect } from "react"
import "../styles/ResumeForm.css"
import "../styles/Resume.css"

const Resume = (props) => {
  return (
    <div className="resume-post card">
      <div className="card-body">
        <span className="post-title">Critique my resume</span>
        <p className="post-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam enim dui, sodales vitae placerat id, vestibulum quis magna. Morbi dignissim mi non est fringilla pharetra vitae id dui. Morbi interdum justo ante, a iaculis metus fermentum faucibus. Sed bibendum sagittis justo, at egestas eros sollicitudin sed. Duis nisl mi, consectetur in lacinia a, aliquet id nunc. Nullam a tellus dui. Donec in nisi finibus, scelerisque tortor sit amet, sagittis erat. Aenean mollis orci lorem, a ultricies enim efficitur vitae. Curabitur ante dui, elementum quis consequat nec, convallis vel elit. Donec elementum dui orci, ut venenatis ex feugiat at. Quisque finibus ex sit amet posuere pharetra. Integer erat arcu, consectetur id scelerisque vitae, venenatis eget turpis. Ut placerat odio et sem tincidunt sagittis. Morbi nec scelerisque mauris, sit amet viverra massa. Morbi gravida iaculis turpis, quis cursus massa tempus nec.
        </p>
      </div>
    </div>
  )
}

export default Resume
