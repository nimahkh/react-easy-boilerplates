module.exports = {
    ident: 'postcss',
    syntax: 'postcss-scss',
    map: {
        'inline': true,
    },
    plugins: {
        'postcss-partial-import': {
            'prefix': '_',
            'extension': '.pcss',
            'glob': false,
            'path': ['./../src/styles']
        },
        'postcss-nested-ancestors': {},
        'postcss-apply': {},
        'postcss-custom-properties': {},
        'postcss-nested': {},
        'postcss-cssnext': {
            'features': {
                'nesting': false
            },
            'warnForDuplicates': false
        },
        'postcss-extend': {},
        'css-mqpacker': {
            'sort': true
        },
        'autoprefixer': {
            'browsers': ['last 15 versions']
        },
    }
};
