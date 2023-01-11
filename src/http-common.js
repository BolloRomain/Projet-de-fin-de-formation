import axios from "axios";

export default axios.create({
  baseURL: "http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api",
  headers: {
    "Content-type": "application/json"
  }
});
