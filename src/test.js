import express from "express";
import * as dotenv from "dotenv";

const app = express();
const port = 8000;

if (process.env.NODE_ENV !== "production"){
    dotenv.config();
}

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
