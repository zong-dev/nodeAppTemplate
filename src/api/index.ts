import { Router } from "express";
import agendash from './routes/agendash';
import auth from "./routes/auth";

export default () => {
    const app = Router();
    auth(app);
    agendash(app);
    return app;
}