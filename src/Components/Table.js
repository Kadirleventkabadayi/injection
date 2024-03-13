import classes from "./Table.module.css";
import { useState } from "react";

const Table = () => {
  const [post, setPost] = useState();
  const [data, setData] = useState([
    { id: null, user_id: null, title: null, content: null },
  ]);

  const columns = Object.keys(data[0]);

  const inputChangeHandler = async (e) => {
    if (post) {
      e.preventDefault();
      try {
        getData("http://192.168.1.169:3000/posts", {
          title: post,
        }).then((data) => {
          console.log(data);
          data.code === 200 ? setData(data.data) : setData((prev) => prev);
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      alert("Lütfen Geçerli Bir Girdi Giriniz!");
    }
  };

  async function getData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  return (
    <>
      <div className={classes.tableContainer}>
        <div className={classes.InputArea}>
          <label>Post Name</label>
          <input
            required
            className={classes.tableInput}
            value={post}
            onChange={(e) => {
              setPost(e.target.value);
            }}
            placeholder="Post Name"
          ></input>
          <button onClick={inputChangeHandler}>Submit</button>
        </div>
        <div style={{ display: "flex", marginBlock: "2%" }}>
          <span>{`SELECT * FROM posts WHERE title like " `}</span>
          <span style={{ color: "red", fontWeight: "bold" }}>{post}</span>
          <span>{` %" LIMIT 1`}</span>
        </div>
        <table border="1" className={classes.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
