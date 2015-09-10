# DO NOT MERGE THIS TO MASTER.
**This repo does not contain a `wercker.yml` file yet, so it is still not deployable.**
_You have been warned._

# Whitesmith Studio 3.0
This is Whitesmith's website, available at [www.whitesmith.co][].

[www.whitesmith.co]: http://www.whitesmith.co


## Development
### Basic
1. [**First time using Gulp**] Run `npm install -g gulp` to make `gulp` globally
available. **This may need `sudo`**.
1. Run `npm install`. This will install all the necessary packages.
1. Run `gulp`

Running `gulp` will:

* Start an HTTP server on port `3000` and open your browser. This server will:
    * Synchronize scroll, clicks and form filling between all open browsers.
    * Inject CSS whenever one of the SASS files is changed.
    * Reload the browser whenever one of the JavaScript files is changed.
    * Reload the browser whenever one of the HTML files is changed.
* Compile the `main.scss` whenever one of the SASS files
(`stylesheets/scss/**/*.scss`) is changed, minified. This generates
`dist/css/styles.css` and `dist/css/styles.min.css`.
* Compile the script files, concatenate, minify them and generate
`scripts.min.js` whenever one of the `javascripts/*.js` files is changed. This
generates `dist/js/scripts.js` and `dist/js/scripts.min.js`.
* The same goes for the vendor CSS and JavaScript files, without the
minification step (they're assumed to already be minified), although the
minification code is commented. This generates `dist/css/vendor.css` and
`dist/js/vendor.js`.
* Copy the assets to the `dist` folder. This assumes they are already
compressed (WIP).

### Structure
This repo assumes the following structure:

```
 assets
 ├── favicons
 ├── fonts
 └── images
 html
 ├── index.html
 └── partials
     ├── header.html
     └── footer.html
 javascripts
 ├── our-script-1.js
 ├── our-script-2.js
 └── vendor
     ├── script-1.js
     ├── script-2.js
     └── script-3
         ├── script-3-module-1.js
         └── script-3-module-2.js
 stylesheets
  ├── scss
  │   ├── main.scss
  │   └── partials
  │       ├── _header.scss
  │       └── _footer.scss
  └── vendor
```

After running `gulp`, an additional folder, `dist`, will be generated. It
follows the structure:

```
 dist
 ├── assets
 │   ├── favicons
 │   │   └── ...
 │   ├── fonts
 │   │   └── ...
 │   └── images
 │       └── ...
 ├── css
 │   ├── vendor.css
 │   ├── styles.css
 │   └── styles.min.css
 ├── js
 │   ├── vendor.js
 │   ├── scripts.js
 │   └── scripts.min.js
 ├── index.html
 ├── about.html
 └── ...
```
