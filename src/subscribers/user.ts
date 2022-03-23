import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import events from "./events";
import mongoose from "mongoose";
import { Logger } from "winston";
import { IUser } from "@/interfaces/IUser";

export default class UserSubscriber {

    @On(events.user.signUp)
    public onUserSignUp({name, email, _id}){
        const Logger: Logger = Container.get('logger');

        try {
            
        } catch (e) {
            Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);

            // Throw the error so the process dies (check src/app.ts)
            throw e;
        }
    }

    @On(events.user.signIn)
    public async onUserSignIn({_id}){
        const Logger: Logger = Container.get('logger');
        try {
            const user = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
            await user.update({_id}, { $set: { lastLogin: new Date() } })
            
        } catch (e) {
            Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);
            // Throw the error so the process dies (check src/app.ts)
            throw e;
        }
    }

}