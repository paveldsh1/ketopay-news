import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 4000;
const API_KEY = "vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh";

app.use(cors());

app.get("/news", async (req: Request, res: Response) => {
    const { year, month } = req.query;

    try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`,
            { params: { "api-key": API_KEY } }
        );
        res.json(response.data.response.docs);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error || "Unknown error" });
    }
});

app.listen(PORT, () => {
    console.log(`The proxy server is running on http://localhost:${PORT}`);
});
