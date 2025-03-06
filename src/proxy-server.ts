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
    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
        res.status(500).json({ error: "Ошибка загрузки новостей" });
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});
