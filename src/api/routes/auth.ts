import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from 'winston';
import middlewares from '../middlewares';

import { IUserInputDTO } from '../../interfaces/IUser';
import { celebrate, Joi } from "celebrate";
import AuthService from '../../services/auth';

const route = Router();


export default (app: Router) => {
    app.use('/auth', route);

    route.post('/signup', celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }), async(req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
        try {
            const authServiceInstance = Container.get(AuthService);
            const user = await authServiceInstance.SignUp(req.body as IUserInputDTO);

            return res.status(200).json(user);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    route.post(
      '/signin',
      celebrate({
        body: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      }),
      async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling Sign-In endpoint with body: %o', req.body);
        try {
          const { email, password } = req.body;
          const authServiceInstance = Container.get(AuthService);
          const { user, token } = await authServiceInstance.SignIn(email, password);
          return res.json({ user, token }).status(200);
        } catch (e) {
          logger.error('🔥 error: %o',  e );
          return next(e);
        }
      },
    );

    route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
}