const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const log = createLogger();

function createLogger() {
    let stream = new PrettyStream();
    stream.pipe(process.stdout);

    return bunyan.createLogger({
        name: 'munchkin',
        stream
    });
}

module.exports = log;