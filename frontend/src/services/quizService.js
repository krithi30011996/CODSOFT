import axios from "axios";

const API =

    axios.create({

        baseURL:
            "https://codsoft-n2pt.onrender.com/api"

    });

export default API;