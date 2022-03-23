import { Container } from 'typedi';
import formData from 'form-data';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import config from '../config';
import nodemailer from 'nodemailer';

export default ({mongoConnection, models}: { mongoConnection; models: {name: string, model: any} []}) => {

    try {

        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        const agendaInstance = agendaFactory({ mongoConnection });

        Container.set('agendaInstance', agendaInstance);
        Container.set('logger', LoggerInstance);

        const transporter = nodemailer.createTransport({
            host: config.email.host,
            port: parseInt(config.email.port),
            auth: {
                user: config.email.username,
                pass: config.email.password,
            },
        });
        Container.set('emailClient', transporter);

        LoggerInstance.info('✌️ Agenda injected into container');

        return { agenda: agendaInstance };
        
    } catch (err) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', err);
        throw err;
    }

}