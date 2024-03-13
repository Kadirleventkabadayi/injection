import classes from "./LoginForm.module.css";
import { useState } from "react";

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const userData = await fetchUserData(loginEmail, loginPassword);

      postData("http://192.168.1.169:3000/", {
        username: loginEmail,
        password: loginPassword,
      }).then((data) => {
        console.log(data);
        data.code === 200
          ? alert("Geçerli Kullanıcı", data.data[0].username)
          : alert("Geçersiz Kullanıcı!");
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  async function postData(
    url = "http://192.168.1.169:3000/",
    data = {
      username: "kullanici1",
      password: "sifre1",
    }
  ) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div className={classes.allForm}>
      <div className={classes.container}>
        <div className={classes.formInfo}>
          <div>
            <h3>SQL Injection</h3>
            <h1>Sign in</h1>
          </div>
        </div>
        <form className={classes.form} onSubmit={loginHandleSubmit}>
          <p className={classes.leftAlign}>Enter your Username</p>
          <input
            required
            type="text"
            placeholder="Username"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <p className={classes.leftAlign}>Enter your Password</p>
          <input
            required
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <div style={{ display: "flex", marginBlock: "2%" }}>
            <span>{`SELECT * FROM users WHERE username = " `}</span>
            <span style={{ color: "red", fontWeight: "bold" }}>
              {loginEmail}
            </span>
            <span>{` " AND password = " `}</span>
            <span style={{ color: "red", fontWeight: "bold" }}>
              {loginPassword}
            </span>
            <span>{`" limit 1`}</span>
          </div>
          <button
            className={classes.loginBtn}
            disabled={!loginEmail || !loginPassword}
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
