import React from "react";
import states from "../data/states.json";

function State(props) {
  return (
    <div className={"state-card " + props.data.name.toLowerCase()}>
      <img
        src={"img/seal-" + props.data.short.toLowerCase() + ".png"}
        alt={props.data.name}
      />
    </div>
  );
}

export default function StatesBanner() {
  return (
    <div className="centering">
      <div className="state-card-container">
        {states.map((element) => {
          console.log(element);
          return <State data={element} />;
        })}
      </div>
    </div>
  );
}
