# [Cactus-UI](https://cactus-ui.ciceksepeti.dev/)

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE) [![Development](https://github.com/ciceksepetitech/cactus-ui/actions/workflows/development.yml/badge.svg?branch=develop)](https://github.com/ciceksepetitech/cactus-ui/actions/workflows/development.yml) [![Release](https://github.com/ciceksepetitech/cactus-ui/actions/workflows/release.yml/badge.svg)](https://github.com/ciceksepetitech/cactus-ui/actions/workflows/release.yml) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat)

![cactus ui logo](assets/cactus-ui.png)

Cactus UI is a library that exposes accessible react components besides some useful hooks and utility functions. Mostly focuses on the accessibility side of the components instead of the visualization. It is easy to customize and can be used together with other libraries like styled-components to style easily.

---

## Getting Started
**Visit [cactus-ui.ciceksepeti.dev](https://cactus-ui.ciceksepeti.dev/) for docs, examples and styling!**

## Features
* Accessible – Accessibility and behaviour is implemented according to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/), including full screen reader and keyboard navigation support.
* Adaptable – All components are designed to work with mouse, touch, and keyboard interactions. They’re built with an accessibility first approach.
* Customizable – Easy to customize with inline style, CSS files and libraries like styled-components.

## How to Interact with Library

Cactus UI uses Yarn to install, build and test packages. To install Yarn please follow this link, [how to install yarn?](https://yarnpkg.com/getting-started/install).
By running commands right below, you will be able to work with Cactus UI locally, 

```
git clone git@github.com:ciceksepetitech/cactus-ui.git
cd cactus-ui
yarn install --frozen-lockfile
yarn lerna:build
```

## Script Definitions

```sh
yarn lerna:build            # builds all packages via lerna
yarn storybook:start        # runs storybook
yarn lint                   # runs linter
yarn format                 # formats all code
yarn test:watch             # runs all tests for all packages in watch mode
```

## Contributors

Thank you to all the contributors for improving this package.
If you would like to be one of the contributors of this package, please follow instructions in [how to contribute?](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/CONTRIBUTING.md)
