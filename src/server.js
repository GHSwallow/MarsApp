import express from "express";
import cors from "cors"
import * as dotenv from "dotenv";
import './rovers.js'
import * as NASAActions from "./rovers.js";


const app = express();
app.use(cors({origin: '*'}))
const port = 8000;
if (process.env.NODE_ENV !== "production"){
    dotenv.config();
}

app.use(express.json());
const router = express.Router();
app.use('/', router);
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});

router.get('/rovers',
    async (req, res) =>
        res.send(await NASAActions.getRoverNames())
);

router.get('/rovers/:rover',
    async (req, res) =>
        res.send(await NASAActions.getSpecificRoverData(req.params.rover))
);

router.get('/rovers/:rover/pictures/:camera',
    async (req, res) =>
        res.send(await NASAActions.getRoverPhotosByCamera(req.params.rover, req.params.camera))
);