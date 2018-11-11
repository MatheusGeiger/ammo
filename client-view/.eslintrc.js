module.exports = {
    'extends': 'eslint:recommended',
    'rules': {
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'complexity': ['error', 4],
        'camelcase': ['error', {
            'properties': 'always'
        }],
        'no-console': 0,
        'new-cap': ['error', {
            'capIsNew': false,
            'newIsCap': false
        }],
        'newline-per-chained-call': ['error', {
            'ignoreChainWithDepth': 2
        }],
        'no-unused-vars': ["error", { "varsIgnorePattern": "React" }]},
    'env': {
        'node': true,
        'es6': true,
        'mocha': true
    },
    'parserOptions': {
        'ecmaVersion': 8,
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
}  