import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";

import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from "../middlewares";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);
}