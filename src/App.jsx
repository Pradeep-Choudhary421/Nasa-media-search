import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import "./index.css";

function App() {
  const [dayPicture, setDayPicture] = useState({
    title: "",
    url: "",
    date: "",
  });
  const [searchedItem, setSearchedItem] = useState("");

  const [searchImg, setSearchImg] = useState([]);

  useEffect(() => {
    fetchDayPicture();
  }, []);

  const fetchDayPicture = () => {
    const apiKey = "0XS8dDoWEJDZg8yuQnX7ed0kLyQbHYY9x1aIyj8z";
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((res) => {
        const { title, url, date, media_type } = res.data;
        setDayPicture({ title, url, date, mediaType: media_type });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const fetchImages = () => {
    const apiUrl = `https://images-api.nasa.gov/search?q=${searchedItem}`;
    axios
      .get(apiUrl)
      .then((res) => {
        const items = res.data.collection.items;
        const images = items.map((item) => ({
          title: item.data[0].title,
          url: item.links[0].href,
        }));
        setSearchImg(images);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="body">
      <form className="form-inline mx-4 my-3">
        <h1>NASA Media Search</h1>
        <input
          type="text"
          value={searchedItem}
          onChange={(e) => setSearchedItem(e.target.value)}
        />
        <button
          className="btn btn-outline-success mx-3"
          type="button"
          onClick={fetchImages}
        >
          Search
        </button>
      </form>
      {searchImg.length === 0 ? (
        <div className="mid mx-4">
        <h2>{dayPicture.title}</h2>
        <h2>{dayPicture.date}</h2>
        <div className="picture">
          {dayPicture.mediaType === "image" ? (
            <img src={dayPicture.url} className="img-fluid" alt={dayPicture.title} />
          ) :  (
            <iframe src={dayPicture.url} frameborder="0" title={dayPicture.title}></iframe>
          )}
        </div>
      </div>
      ) : (
        
        <div className="nasaAlbum ">
          <div className="row">
            {searchImg.map((image, index) => (
              <div key={index} className="col-md-5">
                <h2>{image.title}</h2>
                <img className="album" src={image.url} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
