import React from "react";
import request from "superagent";

import "./App.css";

function App() {
  const [picture, setPicture] = React.useState("");
  const [imgFromCload, setImgFromCload] = React.useState("");

  const handleUpload = file => {
    let Upload = request
      .post("https://api.cloudinary.com/v1_1/ozwaldo/image/upload")
      .field("upload_preset", "images")
      .field("file", file);
    Upload.end((err, response) => {
      if (err) {
        console.log("cloudinary err", err);
      }
      if (response) {
        setImgFromCload(response.body.secure_url);
      }
    });
  };

  return (
    <div className="App">
      <input type="file" onChange={e => setPicture(e.target.files[0])} />
      <button onClick={() => handleUpload(picture)}>Upload</button>
      <img src={imgFromCload} alt="picture" />
    </div>
  );
}

export default App;
