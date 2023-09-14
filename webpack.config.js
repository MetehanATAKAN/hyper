const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new RetryChunkLoadPlugin({
            maxRetries: 3,
        }),
        new Dotenv({
            path: './some.other.env', // default is .env
        }),
    ],
};
