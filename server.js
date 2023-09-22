const express = require("express");
const app = express();
const PORT = 2999;

const axios = require("axios");
const api_key = process.env.NODEJS_API_KEY
const host_url = "http://localhost:3000/api/user/"

app.set("view engine", "ejs");
app.get("/users", async (req, res) => {
  const users = await getUsers()
  res.render("users",{users});
});

app.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const user = await getUser(email)
  res.render("user",{user});
});

async function  getUsers() {
  try {
    response = await axios.get(`${host_url}`, {
      headers: {
        "api_key": api_key
      }
    });
    return response.data;
  } catch (error) {
    console.error("リクエストエラー:", error);
  }
}

async function getUser(email) {
  try {
    response = await axios.get(`${host_url}${email}`, {
      headers: {
        "api_key": api_key
      }
    });
    return response.data;
  } catch (error) {
    console.error("リクエストエラー:", error);
  }
}

app.listen(PORT,() => {
  console.log("サーバーが起動しました。")
})