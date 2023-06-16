# Local Crime Checker

Web app utilising the UK Police public crime API (https://data.police.uk/). Allows a user to view crime data for an area (within 1 mile of any UK postcode, or 1 mile of the location given via browser geolocation), and offers comparisons allowing a user to see trends and changes in crime within the area specified.

The user can compare the most recent month's crime statistics, broken down into categories based on the crimes committed, to the month prior or a specified month; the user can also compare the most recent month to an average of the 3 months prior. The app also provides a yearly comparison that averages the crimes committed for the data available for the current year and allows comparison to previous years.

YouTube demonstration providing an overview of the features: https://www.youtube.com/watch?v=iwf1tJdDMwc

Made using Vue (including Vuelidate and Vue-Router), JavaScript, HTML and CSS.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
