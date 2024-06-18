# eCommerce-Application

It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence

## Goals

1. Sell products via site

2. RSS students demonstrate acquired knowledge and ability to work in a team.

## Pages

1. Login and Registration pages 🖥️
2. Main page 🏠
3. Catalog Product page 📋
4. Product Detailed page (PDP) 🔎
5. User Profile page 👤
6. Basket page 🛒
7. About Us page 🙋‍♂️🙋‍♀️

## Technology Stack

1. React
2. Vite
3. TypeScript
4. Netlify
5. SCSS
6. HTML
7. CSS
8. CommerceTools - a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.
9. Linters: ESLint, Prettier, airbnb rules
10. Husky
11. Git/GitHub


## Organization

0. Agile / Scrum
1. Jira (Board, Dashboard, Releases, Sprint, Poker Planning, Automation)
2. Confluence (Knowledge Base, MoMs, Agreements, Roles and Responsibilities etc..)
3. GitHub (Pull Request, Workflow, Review)

## Design

This is a [link](https://www.figma.com/design/vjzFNPME7k3at8mZA0J1AR/Cozy-House?node-id=0%3A1&t=pkImd2amNwJgTpT2-1) to our project design.

## Setup project locally

1. Install Node.js version >= 20.0.0
2. Clone this [repository](https://github.com/comtvset/eCommerce-Application)
3. Go to the root of project
4. To install all dependencies run code

```
npm i
```

5. Run project in browser locally

```
npm run dev
```

# Scripts:

The project has a few scripts for working with different tools. The common rules how to use them.

1. Open package.json
2. Find section '_scripts_'
3. Select the tool you want to apply
4. Open terminal and run command like: npm run ...

Example:

```
// run Eslint
npm run lint
```

## List of scripts

### dev

to run the whole project in browser using development mode

Example:

```
npm run dev
```

### build

to create deployment build for production

Example:

```
npm run build
```

### preview

previewing the build locally

Example:

```
npm run preview
```

### prepare

automatically added by _husky init_ command to prevent fail

Example:

```
npm run prepare
```

### lint

start check of code quality with additional params. At the end you can find list of errors/warning in the terminal:

--cache - check only changed files

--ext - check only file with specified extensions

--report-unused-disable-directives
This option causes ESLint to report directive comments like // eslint-disable-line when no errors would have been reported on that line anyway.

--max-warnings - Number of warnings to trigger nonzero exit code

Example:

```
npm run lint
```

### format

to automatically format code using Prettier across all files in the src directory. This ensures consistent code style throughout the project.

--cache - check only changed files

--write - format a certain file

Example:

```
npm run format
```

### ci:format

to check code formatting using Prettier across all files in the src directory. This helps identify formatting issues before committing changes.

--cache - check only changed files

--write - to format a file in-place

Example:

```
npm run ci:format
```

### test

to run all tests

Example:

```
npm run test
```
