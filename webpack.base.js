module.exports = {
    module: {
        rules: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.js'],
    },
};
