import axios from "axios";

export default axios.create({
  baseURL: `https://nyrsgtmoql.execute-api.us-east-1.amazonaws.com/prod`,
  headers: {
    "Content-Type": "application/json",
    Authorization: ""
  }
});
