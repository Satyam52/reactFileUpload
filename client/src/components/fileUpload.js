import React, { Fragment, useState } from "react";
import axios from "axios";
const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUfile] = useState({});
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
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There is an error with the Server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <div className="custom-file mb-4">
          <input
            onChange={e => onChange(e)}
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
        ></input>
      </form>
    </Fragment>
  );
};

export default FileUpload;
