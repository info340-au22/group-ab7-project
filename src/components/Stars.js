import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

export function Stars(props) {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (props.starCount - i >= -0.3) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarSolid}
          className="star"
          key={"star-" + i}
        />
      );
    } else if (props.starCount - i >= -0.7) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="star"
          key={"star-" + i}
        />
      );
    } else if (props.showBlank !== "false") {
      stars.push(
        <FontAwesomeIcon icon={faStar} className="star" key={"star-" + i} />
      );
    }
  }
  return <div>{stars}</div>;
}

export function StarDistribution(props) {
  let body = [];
  let starMax = props.stars.reduce((max, cur) => Math.max(max, cur), 0);
  console.log(props.stars);
  for (let i = props.stars.length; i >= 1; i--) {
    body.push(
      <tr key={i + 1 + "-stars"} className="rating-tr">
        <td className="rating-stars">
          <Stars starCount={i} showBlank="false" />
        </td>
        <td className="rating-bar">
          <div className="star-count-bar">
            <div
              className="star-count-bar-content"
              style={{
                paddingLeft: (props.stars[i - 1] / starMax) * 100 + "%",
              }}
            ></div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <table>
      <tbody>{body}</tbody>
    </table>
  );
}

export function calcRating(ratings) {
  let total = 0,
    totalCount = 0;
  for (let i = 1; i <= 5; i++) {
    total += ratings[i - 1] * i;
    totalCount += ratings[i - 1];
  }
  return total / totalCount;
}

export function RateStars(props) {
  const [starCount, setStarCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  let stars = [];
  const reaction = ["", "Terrible", "Bad", "Okay", "Good", "Excellent"];

  for (let i = 1; i <= starCount; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarSolid}
        className="star"
        key={"star-" + i}
        onMouseEnter={() => {
          setStarCount(i);
          setClicked(false);
        }}
        onMouseLeave={() => {
          if (!clicked) setStarCount(0);
        }}
        onClick={() => {
          setClicked(true);
        }}
      />
    );
  }
  for (let i = starCount + 1; i <= 5; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        className="star"
        key={"star-" + i}
        onMouseEnter={() => {
          setStarCount(i);
          setClicked(false);
        }}
        onMouseLeave={() => {
          if (!clicked) setStarCount(0);
        }}
        onClick={() => {
          setClicked(true);
        }}
      />
    );
  }
  return (
    <div className="rate-stars">
      {stars}
      <p>{reaction[starCount]}</p>
    </div>
  );
}
