import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { commentSite } from "../components/EditSiteInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../components/UserAuth";
import { showSubmit } from "../components/showSubmit";
import { FacebookShareButton } from "react-share";

import {
  RateStars,
  Stars,
  StarDistribution,
  calcRating,
} from "../components/Stars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSearchParams } from "react-router-dom";

function jumpTo(target) {
  window.location.replace("#" + target);
}

export default function HomePage(props) {
  const [searchParams] = useSearchParams();
  let siteName = searchParams.get("siteName");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authorData, setAuthorData] = useState({});
  const [siteRatings, setSiteRatings] = useState([0, 0, 0, 0, 0]);
  const [comments, setComments] = useState([]);
  //const [siteBookmarked, setSiteBookmarked] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const cardsRef = ref(db);
    get(child(cardsRef, "sitesDetail/" + siteName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((siteData) => {
        setData(siteData);
        setLoading(false);
        setSiteRatings(siteData.ratings);
        setComments(siteData.comments);
        return siteData;
      })
      .then((siteData) => {
        getUserInfo(siteData.addedBy)
          .then((response) => {
            setAuthorData(response);
            //console.log("!!", response);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //let handleClick = function (event) {
    //set(ref(db, userBookmarkLink), !siteBookmarked);
    //setSiteBookmarked(!siteBookmarked);
  //};

  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div>
        <div
          className="site-page-header"
          style={{ backgroundImage: `url(${data.bannerImg})` }}
        >
          <div className="site-page-title-box">
            <h1 className="site-page-title">{data.title}</h1>{" "}
          </div>
        </div>
        <div className="sites-info-container">
          <SideBarLeft />
          <div>
            <div className="site-info">
              <div className="author-info">
                <p>
                  {"Added by " + authorData.name}
                  <img
                    src={authorData.avatar}
                    alt={`Avatar of ${authorData.avatar}`}
                    className="avatar"
                  ></img>
                </p>
              </div>
            </div>
            <SiteIntro text={data.intro} />
            <SiteGallery data={data} />
            <SiteMap data={data} />
            <SiteRating ratings={siteRatings} />
            <SiteComment
              siteName={data.title}
              setComments={setComments}
              setSiteRatings={setSiteRatings}
            />
            <CommentArea comments={comments} />
          </div>
          <SideBarRight siteName={data.title} />
          <div className="balancer"></div>
        </div>
      </div>
    );
  }
}

function SideBarLeft(props) {
  return (
    <div className="index-bar side-bar">
      <ul>
        <li
          onClick={() => {
            jumpTo("site-introduction");
          }}
        >
          Introduction
        </li>
        <li
          onClick={() => {
            jumpTo("site-gallery");
          }}
        >
          Gallery
        </li>
        <li
          onClick={() => {
            jumpTo("site-map");
          }}
        >
          Location
        </li>
        <li
          onClick={() => {
            jumpTo("site-rating");
          }}
        >
          Ratings
        </li>
      </ul>
    </div>
  );
}

function SiteIntro(props) {
  return (
    <div className="site-info" id="site-introduction">
      <h2>Introduction</h2>
      {props.text.map((element, index) => (
        <p key={"paragraph" + index}>{element}</p>
      ))}
    </div>
  );
}

function SiteGallery(props) {
  const data = props.data;

  return data.gallery !== undefined ? (
    <div id="site-gallery">
      <Carousel className="gallery">
        {data.gallery.map((element, index) => {
          return (
            <div key={"img" + index}>
              <img src={element} />
            </div>
          );
        })}
      </Carousel>
    </div>
  ) : (
    <div></div>
  );
}

function SiteMap(props) {
  const data = props.data;
  return (
    <div className="map-info" id="site-map">
      <div className="location-info">
        <h3>State</h3>
        <p>{data.stateFull}</p>
        <h3>Location</h3>
        <p>{data.location}</p>
      </div>
      <iframe
        referrerPolicy="no-referrer-when-downgrade"
        src={
          "https://www.google.com/maps/embed/v1/place?key=AIzaSyCOj2Uhxker2xOnU5VMLKLqIhkBIoyTBQ0&q=" +
          data.mapName
        }
        allowFullScreen
      ></iframe>
    </div>
  );
}

function SiteRating(props) {
  const ratings = props.ratings;
  return (
    <div className="site-info" id="site-rating">
      <div className="rating">
        <div className="rating-brief">
          <h3>Rating</h3>
          {calcRating(ratings).toFixed(1) + "" !== "NaN" ? (
            <h4>
              <span className="rating-score">
                {calcRating(ratings).toFixed(1)}
              </span>
              /5
            </h4>
          ) : (
            <h3>No rating</h3>
          )}
          <Stars starCount={calcRating(ratings)} />
          <p>
            {ratings.reduce((element, total) => (total += element))} Reviews
          </p>
        </div>
        <div className="rating-detail">
          <StarDistribution stars={ratings} />
        </div>
      </div>
    </div>
  );
}

function SideBarRight(props) {
  const navigate = useNavigate();
  return (
    <div className="operation-bar side-bar">
      <ul>
        <li
          tabIndex="0"
          className="popover-content"
          role="button"
          data-toggle="popover"
          data-trigger="focus"
          title="Add to Bookmark"
          //onClick={handleClick}
        >
          <i className="fa-regular fa-bookmark"></i>
        </li>
        <li
          tabIndex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Share"
        >
          <i className="fa-solid fa-share-from-square"></i>
        </li>
        <li
          tabIndex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Print"
          onClick={() => {
            window.print();
          }}
        >
          <i className="fa-solid fa-print"></i>
        </li>
        <li
          tabIndex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Edit this page"
          onClick={() => {
            navigate("/editSite?siteName=" + props.siteName);
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </li>
      </ul>
    </div>
  );
}

function SiteComment(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(0);
  const db = getDatabase();
  let userID, users; // claiming variables as function-wide variables
  if (getAuth().currentUser != null) {
    userID = getAuth().currentUser.uid; //assigning value to the variable
    users = ref(db, "comments/" + userID);
    set(users, "test to see if creating the subfolder works for now");
  }

  let starCount;
  //const handleClick = (event) => {
  //setComment(true);
  //event.preventDefault();
  //}

  function setStarCount(count) {
    starCount = count;
  }
  // let comments;
  // function com(comm) {
  //   comments =  comm;
  // }
  return (
    <div className="site-info" id="site-comment">
      <div className="hidden error" id="error-not-loged-in">
        <p>
          You must <a href="/login">Log in</a> to submit a review!
        </p>
      </div>
      <div className="hidden error" id="error-no-rating">
        <p>You must leave a rating!</p>
      </div>
      <h2>Write a review</h2>
      <div className="write-review">
        <textarea
          id="write-review-textarea"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Write a review..."
        ></textarea>

        <RateStars setStarCount={setStarCount} update={update} />
      </div>
      <button
        id="submit-comment-button"
        onClick={() => {
          if (!user) {
            document
              .getElementById("error-not-loged-in")
              .classList.remove("hidden"); // not logged in
          } else {
            document
              .getElementById("error-not-loged-in")
              .classList.add("hidden");
            if (starCount !== 0) {
              commentSite(
                props.siteName,
                starCount,
                user.uid,
                document.getElementById("write-review-textarea").value
              ).then((data) => {
                props.setSiteRatings(data[0]);
                if (data[1].length !== 0) {
                  props.setComments(data[1]);
                }
                document.getElementById("write-review-textarea").value = "";
                showSubmit(
                  document.getElementById("submit-comment-button"),
                  "Submitted!"
                );
                setUpdate(update + 1);
              });
            } else {
              document
                .getElementById("error-no-rating")
                .classList.remove("hidden");
            }
          }
          // if(comment != null) {
          //   commentSite(comment)
          // }
        }}
      >
        Submit!
      </button>
    </div>
  );
}

function submitComment(event) {
  showSubmit(event.currentTarget, "Submitted");
}

function CommentArea(props) {
  let comments;
  if (props.comments !== undefined) {
    comments = props.comments.reduce((reserved, element) => {
      return [element, ...reserved];
    }, []);
  }
  return (
    <div className="site-info">
      {props.comments === undefined || props.comments.length === 0 ? (
        <h3>No review yet.</h3>
      ) : (
        comments.map((element, index) => {
          return <SingleComment comment={element} key={"comment #" + index} />;
        })
      )}
    </div>
  );
}

function SingleComment(props) {
  let comment = props.comment;
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserInfo(comment.userId)
      .then((response) => {
        setUserData(response);
        //console.log("!!", response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="single-comment">
      <img src={userData.avatar} alt={"avatar of " + userData.name}></img>
      <div>
        <div className="comment-info">
          <h4>{userData.name}</h4>
          <Stars starCount={comment.stars} />
          <p>{comment.time === undefined ? "" : comment.time}</p>
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}
