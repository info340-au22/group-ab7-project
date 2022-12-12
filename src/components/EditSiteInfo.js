import { getDatabase, ref, set, child, get, update } from "firebase/database";

export function createSite(siteName, userId) {
  const db = getDatabase();
  update(ref(db, `sitesInfo/${siteName}`), {
    state: "WA",
    siteType: "cultural",
    imgSrc: "",
    imgAlt: "",
    siteName: siteName,
    siteFact: "",
    siteLocation: "",
    published: false,
    title: siteName,
    stateFull: "Washington",
    intro: [],
    ratings: [0, 0, 0, 0, 0],
  });
  update(ref(db, `sitesDetail/${siteName}`), {
    addedBy: userId,
    siteName: siteName,
    siteFact: "",
    siteLocation: "",
    published: false,
    title: siteName,
    stateFull: "Washington",
    intro: [],
    bannerImg: "",
    mapName: siteName,
    location: "Seattle",
    ratings: [0, 0, 0, 0, 0],
    gallery: [],
  });
}

export function editSiteInfo(siteName, properties) {
  console.log(siteName);
  console.log(properties);
  const db = getDatabase();
  update(ref(db, `sitesInfo/${siteName}`), properties);
}

export function editSiteDetail(siteName, properties) {
  console.log(siteName);
  console.log(properties);
  const db = getDatabase();
  update(ref(db, `sitesDetail/${siteName}`), properties);
}

export function commentSite(siteName, starCount, user, comment) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  console.log(starCount);
  addStar(siteName, starCount);
  //  window.location.reload();
  if (starCount >= 1 && starCount <= 5) {
    if (comment !== "" || comment !== undefined) {
      get(child(dbRef, `sitesDetail/${siteName}/comments`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
            return [];
          }
        })
        .then((data) => {
          set(ref(db, `sitesDetail/${siteName}/comments`), [
            ...data,
            {
              userId: user === undefined ? "Anonymous" : user,
              comment: comment === undefined ? "ERROR LOADING COMMENT" : user,
              stars: starCount,
            },
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
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

function addStar(siteName, starCount) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  get(child(dbRef, `sitesInfo/${siteName}`))
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
    })
    .catch((error) => {
      console.error(error);
    });
  get(child(dbRef, `sitesDetail/${siteName}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().ratings;
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {
      data[starCount - 1]++;
      update(ref(db, `sitesDetail/${siteName}`), { ratings: data });
    })
    .catch((error) => {
      console.error(error);
    });
}
