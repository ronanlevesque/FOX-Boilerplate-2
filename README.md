# FOX Boilerplate 2

An HTML5 / Sass / Gulp Boilerplate including [FOX CSS](http://fox-css.com). Currently composed of the following :

* HTML5 responsive base template
* FOX CSS framework (Sass)
* Sass & CSS3 Autoprefixer (compile on default task)
* Livereload (no plugin required)
* JSHint, CSS Lint and HTML Hint
* IE9+ support
* Files minification (CSS, JS and images)
* Local server at `localhost:8000`
* Notifications system with Growl

And more to come.

This Boilerplate is designed to be as less obtrusive as possible. FOX CSS is installed by default but you can start your project with your own framework or with just a blank CSS file.

## Installation

You need to have [Node](http://nodejs.org/) and [Gulp](http://gulpjs.com/) installed on your computer. If you don't, install Node from the website and install Gulp from the command line :

	npm install -g gulp

You may need to run `sudo` depending on your OS, or run the command shell as an Admin (for Windows users).

Download and install FOX Boilerplate files in the directory where you want to work. Just install the Gulp dependencies by running the following command in your project folder :

	npm install

## Files configuration

FOX-Boilerplate is composed of two main folders :

* dev
* assets (created on 1st `gulp` task)

Files should be placed in the following folders inside your project :

* SCSS : dev/sass/..
* JS files : dev/js/
* Images : dev/img/..
* HTML files : anywhere inside dev/

## Usage

Open the command line tool in your working folder. For Windows users, there are two easy ways to do so :

* Run cmd in the location bar
* Or shift + right click in your folder and select "Open command window here" (or something equivalent)

Run the following commands depending on what you want.

### gulp

`gulp` will run a local server at `localhost:8000` using `dev` folder as a root, and will also run the `watch` task, which includes the following:

* livereload
* Sass files compilation, autoprefix
* JS concatenation
* CSS, JS and images minification.

### gulp test

`gulp test` will run JSHint on your JavaScript files and will also test your HTML and CSS files. You can also run each task separately with `gulp lint`, `gulp css` and `gulp html`.

If you need more info on Gulp, you should take a look at Gulp's [guide](https://github.com/gulpjs/gulp/blob/master/docs/README.md).

## Notifications

FOX Boilerplate also comes with an optional notification system.

## Help

If you need help, please [contact me](https://twitter.com/ronanlevesque) on Twitter.

## License

The MIT License (MIT)

Copyright (c) 2015 Ronan Levesque

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
