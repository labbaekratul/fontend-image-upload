import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { useState } from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import Loading from "./components/Loading";
function App() {
  const [loading, setLoading] = useState(false);
  const [uploadData, setUploadData] = useState([]);
  const [dailyLimitData, setDailyLimitData] = useState({});

  //FILE UPLOAD HANDLER
  const uploadFileHandler = async (e) => {
    let files = e.target.files;
    const bodyFormData = new FormData();
    bodyFormData.append("uploads", files);

    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("uploads", files[i]);
    }
    setLoading(true);
    const { data, headers } = await axios.post(
      "http://localhost:5000/files",
      bodyFormData
    );
    setLoading(false);
    e.target.value = null;
    const totalImage = [...uploadData, ...data];
    setDailyLimitData(headers);
    setUploadData(totalImage);
  };

  //FILE DELETE HANDLER
  const handleDelte = async (privateKey) => {
    if (window.confirm("Are you sure to delete?")) {
      const { data, headers } = await axios.delete(
        `http://localhost:5000/files/${privateKey}`
      );
      if (data.massage === "file deleted") {
        const deleteData = uploadData?.filter(
          (x) => x.privateKey !== privateKey
        );
        setDailyLimitData(headers);
        setUploadData(deleteData);
      }
    }
  };

  //FILE DOWNLOAD HANDLER
  const handlerDownload = async (privateKey) => {
    setLoading(true);
    const { data, headers } = await axios.get(
      `http://localhost:5000/files/${privateKey}`
    );
    setLoading(false);
    setDailyLimitData(headers);
    fileDownload(data, privateKey);
  };

  console.log(dailyLimitData["ratelimit-reset"]);

  return (
    <div className="container">
      <div className="main">
        <div className="mt-5 heading">
          <h2>Upload Anything, From Anywhere</h2>
          <p>
            Daily Limits Left :{" "}
            <b style={{ color: "orange" }}>
              {dailyLimitData["x-ratelimit-remaining"]
                ? dailyLimitData["x-ratelimit-remaining"]
                : "15"}
            </b>
          </p>
          <p>
            Reset Daily Limits Time{" "}
            <span style={{ color: "aqua" }}>
              {dailyLimitData["ratelimit-reset"]}
            </span>
          </p>
          {dailyLimitData["x-ratelimit-remaining"] === 0 ? (
            <b style={{ color: "red" }}>You Reached Your Limits</b>
          ) : (
            ""
          )}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="inputbox">
            <input
              type="file"
              className="upload"
              onChange={uploadFileHandler}
              multiple
            />
          </div>
        )}
        {uploadData &&
          uploadData?.map((files) => (
            <div key={files?.privateKey}>
              <div className="singleData">
                <div>
                  <BsFillFileEarmarkFill className="context" /> File.
                  {files?.privateKey.split(".").pop()}
                </div>{" "}
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelte(files?.privateKey)}
                  >
                    DELETE
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-success"
                    onClick={() => handlerDownload(files?.privateKey)}
                  >
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
