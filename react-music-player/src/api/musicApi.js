import axios from "axios";

export const getSongs = async () => {
    const res = await axios.get("/src/data/db.json");
    return res.data.songs;
};
