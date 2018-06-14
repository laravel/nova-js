import alias from 'rollup-plugin-alias'
import path from 'path'

export default {
    input: './src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        alias({
            '@': path.resolve(__dirname, 'src'),
        }),
    ],
}
