import React from "react";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
  <div>
    {courseParts.map(coursePart => {
      return <p key={coursePart.name}> {coursePart.name} {coursePart.exerciseCount} </p>
    })}
  </div>
  )
}

export default Content;