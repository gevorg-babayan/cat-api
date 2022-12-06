import axios from "axios";

export  const inst =  axios.create({
        baseURL: "https://api.thecatapi.com/v1"
})

