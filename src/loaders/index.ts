import expressLoader from './express';
import dependencyInjector from './dependencyInjector';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    const userModel = {
        name: 'userModel',
        model: require('../models/user').default,
    };
   
    // It returns the agenda instance because it's needed in the subsequent loaders
    const { agenda } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
        userModel,
        // salaryModel,
        // whateverModel
        ],
    });

    Logger.info('✌️ Dependency Injector loaded');

    await jobsLoader({ agenda });
    Logger.info('✌️ Jobs loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
}