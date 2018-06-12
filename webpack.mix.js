let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
console.log(path.resolve(__dirname, 'js/'))

mix
    .js('js/app.js', 'dist/js/app.js') // Nova app
    .js('js/modules.js', 'dist/js/index.js') // Nova modules

    .postCss('css/app.css', 'dist/css', [tailwindcss('tailwind.js')])

    .copy('dist/js/app.js', '../nova-app/public/nova/app.js')
    .copy('dist/css/app.css', '../nova-app/public/nova/app.css')

    .webpackConfig({
        output: {
            library: 'laravel-nova',
            libraryTarget: 'umd'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'js/'),
            },
        },
    })
