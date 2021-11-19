import React from "react";
import { CoursePart } from "../types";


const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong> <br />
            <em>{part.description}</em> <br />
          </p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong> <br />
            <em>Project exercises {part.groupProjectCount}</em> <br />
          </p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong> <br />
            <em>{part.description}</em> <br />
            submit to {part.exerciseSubmissionLink}
          </p>
        </div>
      )
    case "special":
      return (
        <div>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong> <br />
            <em>{part.description}</em> <br />
            Required skills: {part.requirements.join(", ")}
          </p>
        </div>
      )
  }
}

export default Part