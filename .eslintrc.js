module.exports = {
    env: {
        es2018: true,
        node: true
    },
    plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'node', 'promise', 'unicorn'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:eslint-comments/recommended',
        'plugin:import/typescript',
        'plugin:node/recommended',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.cjs', '.mjs']
    },
    rules: {
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
                typedefs: true
            }
        ],
        '@typescript-eslint/no-misused-promises': 'off',
        'no-prototype-builtins': 'off',
        'promise/prefer-await-to-then': 'warn',
        'promise/prefer-await-to-callbacks': 'warn',
        'node/prefer-promises/dns': 'warn',
        'node/prefer-promises/fs': 'warn',
        'node/exports-style': [
            'warn',
            'module.exports',
            {
                allowBatchAssign: true
            }
        ],
        'node/no-missing-import': [
            'error',
            {
                tryExtensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.mjs']
            }
        ],
        'node/no-unpublished-import': [
            'error',
            {
                allowModules: ['chai', 'sinon', 'supertest']
            }
        ],
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'unicorn/custom-error-definition': 'warn',
        'unicorn/no-empty-file': 'warn',
        'unicorn/no-keyword-prefix': 'warn',
        'unicorn/no-unsafe-regex': 'warn',
        'unicorn/prefer-string-replace-all': 'warn',
        'unicorn/prefer-top-level-await': 'warn'
    },
    ignorePatterns: ['*.json', '.nyc_output', '.prettierignore', 'dist', 'node_modules'],
    overrides: [
        {
            files: ['*test.*', '*.mock.*'],
            globals: {
                after: 'readonly',
                afterAll: 'readonly',
                afterEach: 'readonly',
                before: 'readonly',
                beforeAll: 'readonly',
                beforeEach: 'readonly',
                describe: 'readonly',
                it: 'readonly'
            }
        }
    ]
}
