import React from "react";
import BookmarkCard from "./BookmarkCard";

export default function BookmarkBox(props) {
    
    const bookmarkedArray = props.bookmarks;
      //console.log(bookmarkedArray);
   
      const bookmarks = bookmarkedArray.map((current) => {
        return(
            <BookmarkCard data={current} key={current.siteName}></BookmarkCard>);
      });
       
      return (
        <section className="bookmark-box">
                {bookmarks}
        </section>
      );
}
