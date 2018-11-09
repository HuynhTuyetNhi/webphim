
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    // link tới webpack.config.js
    // entry: './src/app/controller/index.js',
    entry:{
        index:'./src/app/controller/index.ts',
        // out ra build từ ts ra js
        card :'./src/app/controller/card.ts'
     
    },
    devtool:'source-map',
    output:{
        //Đường dẫn
        path: path.resolve(__dirname,'dist'),
        // filename: './js/bundle.js'
        filename: './js/[name].js'

    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.ts$/,
                use:['ts-loader']
            },
            {
                test:/\.(png|jpg|svg)$/,
                use: [{
                    loader :"file-loader",
                    options:{
                        limit:10000,
                        name:'[name].[ext]',
                        outputPath:"img/",
                        publicPath:"img/",
                    }
                }]
            }
        ]
    },
    // import file ts,js thì cần tên dc rồi. 
    resolve :{
        extensions:['.ts','.js']
    },
    plugins: [
        new HtmlWebpackPlugin ({
            filename:'index.html',
            template:'./src/app/Views/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin ({
            filename:'card.html',
            template:'./src/app/Views/card.html',
            chunks:['card']
        })
      
    ],
    devServer:{
        // đọc dc file nằm trong dist
        contentBase:'./dist'
    }

}