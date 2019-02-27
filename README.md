> Demo for linter bug in TypeScript projects, where lines are incorrectly untouched when configuring `vue/script-indent` to ignore nested objects/arrays ([`vuejs/eslint-plugin-vue#834`](https://github.com/vuejs/eslint-plugin-vue/issues/834))

## Steps to reproduce

 1. Clone this repo, and run the linter:

        git clone https://github.com/tony19-sandbox/eslint-plugin-vue-issue-834.git
        npm run lint

 2. Observe `foo()` in `src/components/HelloWorld.vue` is formatted as:

        @Component
          export default class HelloWorld extends Vue {
        @Prop() private msg!: string;

        foo () {                  ❌
        const x = {               ❌
        a: [],
        b: 1,                     ❌
        c: {},
        d: 2                      ❌
        }                         ❌
        return x                  ❌
        }                         ❌
          }

## Original project setup

 1. Generate TypeScript project with Vue CLI, selecting the following features:

        Vue CLI v3.4.1
        ? Please pick a preset: Manually select features
        ? Check the features needed for your project: Babel, TS, Linter
        ? Use class-style component syntax? Yes
        ? Use Babel alongside TypeScript for auto-detected polyfills? Yes
        ? Pick a linter / formatter config: Standard
        ? Pick additional lint features: (Press `<space>` to select, `<a>` to toggle all, `<i>` to invert selection)Lint on save
        ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
        ? Save this as a preset for future projects? No

 2. In `.eslintrc.js`, add the following rule to ignore nested arrays/objects, excluding top level from the exported object in `.vue`:

        'vue/script-indent': [
          'error',
          2,
          {
            'baseIndent': 1,
            'ignores': [
              '[value.type="ObjectExpression"]:not(:matches(ExportDefaultDeclaration, [left.property.name="exports"]) > * > [value.type="ObjectExpression"])',
              '[value.type="ArrayExpression"]'
            ]
          }
        ]

 3. In `src/components/HelloWorld.vue`, add the following unindented class method:

        @Component
        export default class HelloWorld extends Vue {
          @Prop() private msg!: string;

        foo() {
        const x = {
        a: [],
        b: 1,
        c: {},
        d: 2
        }
        return x;
        }

        }
