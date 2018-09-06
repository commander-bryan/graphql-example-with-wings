import utils from './utils';

const config = {
    // Used to specify allowed source of CORS requests
    clientWhitelist: utils.getEnv('CLIENT_WHITELIST'),

    // Used to enable/disable CORS functionality
    enableCors: utils.getEnv('ENABLE_CORS'),
};

export default config;
