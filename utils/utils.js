const methods = {
    getEnv: (key) => {
        if (process.env[key]) {
            if (process.env[key].toLowerCase() === 'true') {
                return true;
            }
            if (process.env[key].toLowerCase() === 'false') {
                return false;
            }
            return process.env[key].replace(/\\n/g, '\n');
        }
        throw new Error(`Undefined variable ${key}`);
    },
};

module.exports = methods;
