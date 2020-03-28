import React, { Fragment, useState } from "react";
import Message from "./Message";
import axios from "axios";
const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUfile] = useState({});
  const [message, setmsg] = useState("");
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;

      setUfile({ fileName, filePath });
      setmsg("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setmsg("There is an error with the Server");
      } else {
        setmsg(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={e => onSubmit(e)}>
        <div className="custom-file mb-4">
          <input
            onChange={onChange}
            type="file"
            className="custom-file-input"
            id="customFile"
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: "100%", border: "1px", borderColor: "red" }}
              src={uploadedFile.filePath}
              alt=""
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
