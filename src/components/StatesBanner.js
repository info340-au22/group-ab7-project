import React from "react";
import states from "../data/states.json";

function State(props) {
  return (
    <div
      className={"state-card " + props.data.name.toLowerCase()}
      onMouseOver={() => {
        props.callBack(props.data.name);
        props.callBackFilterStates(props.data.short.toUpperCase());
      }}
    >
      <img
        src={"img/seal-" + props.data.short.toLowerCase() + ".png"}
        alt={props.data.name}
      />
    </div>
  );
}

export default function StatesBanner(props) {
  return (
    <div className="centering">
      <div className="state-card-container">
        {states.map((element) => {
          return (
            <State
              key={element.name}
              callBack={props.callBack}
              callBackFilterStates={props.callBackFilterStates}
              data={element}
            />
          );
        })}
      </div>
    </div>
  );
}
