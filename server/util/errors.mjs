import { addErrorText } from './functions';

process.on('uncaughtException', (error) => {
    addErrorText(error);
});

process.on('unhandledRejection', (error) => {
    addErrorText(error);
});