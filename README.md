# Sanamedic S.R.L. Desktop

### Install

Jump into  directory and install dependencies from npm registry:

```sh
npm install
```

Next, install dependencies from Bower registry:

```sh
bower install
```
And that's it!

### Use
Execute Gulp serving task to check if everything is fine:

```sh
gulp serve
```

Your default browser will be launched at `http://localhost:3000` serving project. See other Gulp tasks and npm scripts
you can use below.


## Gulp tasks

### Most used

* `gulp serve` or `npm start` - Build project, start watching for all changes and serve it using Browsersync.
* `gulp default` or `npm run build` - Clean used directories and build production version ready to deploy.

### Other

* `gulp build` - Build production version ready to deploy.
* `gulp build-app` - Build production version of app only, without assets.
* `gulp clean` - Clean distribution and temporary directories.
* `gulp fonts` - Copy and flatten fonts from Bower packages to distribution dir.
* `gulp inject` - Inject scripts and styles into HTML entry.
* `gulp inject:reload` - Start `inject` task and launch Browsersync reloading after.
* `gulp locales` - Build locales.
* `gulp locales-angular` - Build Angular locales only.
* `gulp locales-angular:dist` - Build Angular locales only to distribution dir.
* `gulp locales:dist` - Build locales to distribution dir.
* `gulp locales:watch` - Build locales and watch for changes.
* `gulp other` - Copy various not handled stuff to distribution dir.
* `gulp partials` - Create template cache from HTML partials.
* `gulp scripts` - Build scripts.
* `gulp scripts:clean` - Clean temporary scripts.
* `gulp scripts:watch` - Build scripts and watch for changes.
* `gulp serve:dist` or `npm run start:dist` - Build production version and serve it using Browsersync.
* `gulp styles` - Build styles.
* `gulp styles:watch` - Build styles and watch for changes.
* `gulp watch` - Build project and watch for all changes.

## Npm scripts

npm scripts are not related to the development flow itself, but can be helpful to keep your project up to date.

* `npm run docs:gulp` - Make markdown file containing Gulp tasks description as in the list above.
* `npm run lint` - Lint JavaScript files.
* `npm run update:bower` - Update dependencies versions in `bower.json` to the latest.
* `npm run update:dev` - Update dependencies versions in `package.json` to the latest.

After updating dependencies versions you actually need to install them, do it with the following commands:

```sh
bower install
npm install
```