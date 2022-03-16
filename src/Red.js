import axios from "axios";

const Axios = axios.create({
  baseURL: "https://opentdb.com/api.php",
});

export const opt = "?amount=10&category=9&difficulty=easy&type=boolean";

export const data = {
  response_code: 0,
  results: [],
};

const Red = {
  getData: async (fn, q = opt) => {
    //console.log(q);
    const entrada = await Axios.get(q)
      .then((resp) => {
        if (fn instanceof Function) {
          fn(resp.data);
        } else {
          console.log("Red: Parámetro no es función");
        }
      })
      .catch((error) => {
        if (fn instanceof Function) {
          fn(data);
        } else {
          console.log(error);
        }
      });
  },
};

export default Red;
