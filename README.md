# eCommerce-Application

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

automatically added by *husky init* command to prevent fail 

Example:
```
npm run prepare
```


### lint

start check of code quality with additional params. At the end you can find list of errors/warning in the terminal:

--cache - check only changed files

--ext - check only file with specified extentions

--report-unused-disable-directives
This option causes ESLint to report directive comments like // eslint-disable-line when no errors would have been reported on that line anyway.

--max-warnings - Number of warnings to trigger nonzero exit code


Example:
```
npm run lint
```

### format

start check of code quality with additional params. At the end you can find list of errors/warning in the terminal:

--cache - check only changed files

--write - format a certain file

Example:
```
npm run format
```

### ci:format

start check of code quality with additional params. At the end you can find list of errors/warning in the terminal:

--cache - check only changed files

--write - to format a file in-place

Example:
```
npm run ci:format
```
