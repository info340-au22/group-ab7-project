import React, { useState } from "react";
import StatesBanner from "./StatesBanner";
import states from "../data/states.json";

const attributes = [
  {
    name: "Capital",
    attr: "capital",
  },
  {
    name: "Largest City",
    attr: "largestCity",
  },
  {
    name: "Total Area",
    attr: "totalArea",
  },
  {
    name: "Population",
    attr: "population",
  },
  {
    name: "Population Density",
    attr: "populationDensity",
  },
  {
    name: "Highest elevation",
    attr: "highestElevation",
  },
  {
    name: "Time Zone",
    attr: "timeZone",
  },
];

function StateBrief(props) {
  return (
    <div className="page-middle state-info">
      <div className="shadow state-info-card">
        <img
          src={"img/seal-" + props.data.short.toLowerCase() + ".png"}
          alt={props.data.name}
        />
        <div className="state-info-mid">
          <p>
            <span className="state-name">{props.data.name}</span>{" "}
            <span className="state-nickname">"{props.data.nickname}"</span>
          </p>
          <p>Motto: {props.data.motto}</p>
          <p>{props.data.description}</p>
        </div>
        <table className="state-info-table">
          <tbody>
            {attributes.map((element) => {
              return (
                <tr key={element.name}>
                  <td>{element.name}</td>
                  <td>{props.data[element.attr]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StatesInfo(props) {
  const [currentState, changeCurrentState] = useState(0);
  function updateState(state) {
    for (let i = 0; i < states.length; i++) {
      if (state === states[i].name) {
        changeCurrentState(i);
        return;
      }
    }
    changeCurrentState(null);
  }

  return (
    <section>
      <StatesBanner
        callBack={updateState}
        callBackFilterStates={props.callBackFilterStates}
      />
      <StateBrief data={states[currentState]} />
    </section>
  );
}
