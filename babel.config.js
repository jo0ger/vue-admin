module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        'lodash',
        [
            'import', {
                'libraryName': 'iview',
                'libraryDirectory': 'src/components'
            }
        ]
    ]
}
