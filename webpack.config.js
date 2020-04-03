// esse arquivo é interpretado pelo node por isso usa o commons js que é o module.exports ao invés do export defatault do es2015
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// para colocar uma variável de ambiente padrão para mac, linux e windows, lá em package tem o cross-env que é uma dependencia que faz iss
const modoDev = process.env.NODE_ENV !== 'production';

// minificar os arquivos
const TerserPlugin = require('terser-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: modoDev? 'development': 'production',
    entry: './src/principal.js',
    output:{
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer:{
        contentBase: 'public',
        port: 8080
    },
    plugins:[
        new miniCssExtractPlugin({
            filename: "estilo.css"
        })
    ],
    optimization:{
        minimizer:[
            new TerserPlugin(),
            new optimizeCssAssetsWebpackPlugin({})
        ]
    },
    module:{
        rules:[{
            test: /\.s?[ac]ss$/,
            use:[
                miniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        },{
            test: /\.(jpg|png|gif|svg)$/,
            use:[{
                loader: 'file-loader',
                options:{
                    esModule: false,
                },
            }]
        }
    ]
    }
}