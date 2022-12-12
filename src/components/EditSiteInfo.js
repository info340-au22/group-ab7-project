import { getDatabase, ref, set, child, get, update } from "firebase/database";

export function createSite(siteName, userId) {
  const db = getDatabase();
  update(ref(db, `sitesInfo/${siteName}`), {
    state: "",
    siteType: "",
    imgSrc: "",
    imgAlt: "",
    siteName: siteName,
    siteFact: "",
    siteLocation: "",
    published: false,
    title: siteName,
    ratings: [0, 0, 0, 0, 0],
  });
  update(ref(db, `sitesDetail/${siteName}`), {
    addedBy: userId,
    siteName: siteName,
    siteFact: "",
    siteLocation: "",
    comment: [],
    published: false,
    title: siteName,
    stateFull: "",
    intro: [],
    bannerImg: "",
    mapName: siteName,
    location: "",
    ratings: [0, 0, 0, 0, 0],
    gallery: [],
  });
}

export function editSiteInfo(siteName, properties) {
  //console.log(siteName);
  //console.log(properties);
  const db = getDatabase();
  update(ref(db, `sitesInfo/${siteName}`), properties);
}

export function editSiteDetail(siteName, properties) {
  //console.log(siteName);
  //console.log(properties);
  const db = getDatabase();
  update(ref(db, `sitesDetail/${siteName}`), properties);
}

function getCurrentTime() {
  return new Date()
    .toLocaleString("en-US", {
      hour12: false,
    })
    .slice(0, -3);
}

async function getSiteInfo(part, siteName) {
  const db = getDatabase();
  const cardsRef = ref(db);
  return get(child(cardsRef, "sitesDetail/" + siteName + "/" + part))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return "";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getSiteBrief(siteName) {
  const db = getDatabase();
  const cardsRef = ref(db);
  let result = [];
  for (let i = 0; i < siteName.length; i++) {
    result = [
      ...result,
      await get(child(cardsRef, "sitesInfo/" + siteName[i]))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
            return {};
          }
        })
        .catch((error) => {
          console.error(error);
        }),
    ];
  }
  return result;
}

export async function commentSite(siteName, starCount, user, comment) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  let stars,
    comments = [];
  stars = await addStar(siteName, starCount);
  if (starCount >= 1 && starCount <= 5) {
    if (comment !== undefined && comment !== "") {
      await get(child(dbRef, `sitesDetail/${siteName}/comments`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
            return [];
          }
        })
        .then((data) => {
          comments = [
            ...data,
            {
              userId: user === undefined ? "Anonymous" : user,
              comment:
                comment === undefined ? "ERROR LOADING COMMENT" : comment,
              stars: starCount,
              time: getCurrentTime(),
            },
          ];
          set(ref(db, `sitesDetail/${siteName}/comments`), comments);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  //console.log(stars);
  //console.log(comments);
  return [stars, comments];
}

export function toggleSiteStatus(siteName) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  get(child(dbRef, `sitesInfo/${siteName}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().published;
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {
      update(ref(db, `sitesInfo/${siteName}`), { published: !data });
    })
    .catch((error) => {
      console.error(error);
    });
}

async function addStar(siteName, starCount) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  let returnValue;
  await get(child(dbRef, `sitesInfo/${siteName}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().ratings;
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {
      data[starCount - 1]++;
      update(ref(db, `sitesInfo/${siteName}`), { ratings: data });
      update(ref(db, `sitesDetail/${siteName}`), { ratings: data });
      returnValue = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return returnValue;
}
