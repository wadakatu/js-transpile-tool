import path from 'path';
import webpack from 'webpack';
import glob from 'glob';

const entries = glob.sync("./src/**/*.js");

export default function (env) {
    const filename = env.filename;
    const __dirname = path.resolve();

    return {
        mode: 'production',
        entry: entries,
        output: {
            path: `${__dirname}/dist`,
            filename: filename + '.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/preset-env",
                                ]
                            }
                        }
                    ]
                },
            ],
        },
        target: ["web", "es5"],
        plugins: [
            new webpack.ProgressPlugin(),
        ],
    }
}

