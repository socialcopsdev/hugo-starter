



# Hugo Starter Project

## What is this?

This is a small project to show the capabilities and structure of a website built using [Hugo](https://gohugo.io/), a static website generator written in Go.  It allows you to write reusable website components and pages using simple html template syntax, and to generate static html pages by combining these templates with different content.

Hugo enables teams to quickly build and iterate upon complex static websites.  The resulting site is easy and cheap to host using an enterprise-grade service such as [AWS Cloudfront](https://aws.amazon.com/cloudfront/), and very fast since there is no server-side rendering for each page request.


## Setup


 1.  Install Hugo using these  [these instructions](https://gohugo.io/overview/installing/).
 2.  Run `npm install` or `yarn` to get the dependencies for the included Gulp build system.
 3.  Build and optimize resources by running `gulp`
 4.  Run `hugo server` to build the site and visit [localhost:1313/hugo-starter/](http://localhost:1313/hugo-starter/) to view it.


## Structure

The Hugo [documentation](https://gohugo.io/overview/introduction/) gives a much better overview of the project structure than me, so check it out.

- The `/content` directory is where the core website content is stored.  Files can be organized in any sort of directory structure and can be written in either markdown or plain html.  
	- The `+++` stuff at the top of each file is called "Front Matter", and can hold the metadata for each page.  This metadata can later be accessed in the layouts to dynamically render content.
- The `/layouts` directory contains the html templates, the structural building blocks for the website.  
	- The `/layouts/partials` directory contains reusable html components that we can inject into any template.  This is useful for headers, footers, navbars, sharing links, and other common components.  
	- The `/layouts/pages` directory is where we store the templates for rendering the content in the `/content` directory.
- The `/archetypes`, `/data`, and `/themes` directories have some cool roles as well, but we don't need to use them in this sample project. Check out the [Hugo documentation](https://gohugo.io/overview/introduction/) for more info.
- The core project configuration is stored within the `config.toml` file.  The data here is accessible from any template in the `/layouts` directory.  This is where we store top-level data like the site name and the menu configuration.
- The website resources(css, javascript, images) are stored in the `/static` directory.
- The prebuild resources(SCSS, Javascript ES6) are stored in the `/src` directory.
- The `/public` directory is the final product, with the entire generated website.


## Build System

This starter project has a basic [Gulp](http://gulpjs.com/) build system configured.  This allows us to write SCSS and ES6 Javascript in the `/src` directory, and compiles it to minified browser compatible code in the `/static` directory.  It will also optimize any images in the `/src/images` directory.

 - To build all of the resources in the `src` directory, run `gulp` or `gulp build`.
 - To watch the `/src` directory and automatically rebuild when a change is detected, run `gulp watch`. 
 - To build the `/public` directory from the static resources and html templates, run `hugo`.
 - The `hugo server` command serves the site to [ localhost:1313/hugo-starter](http://localhost:1313/hugo-starter/),  automatically watches the project files, and runs a live reload script on the web page whenever a change is made.
 - By running `gulp watch` and `hugo server` at the same time, you can automatically sync resource changes from `/src` directly to the webpage.  As a shortcut for running both watchers at once, use `npm start`.

You can also place prebuilt resources, such as libraries and fonts, directly in the `/static` directory. These will be overwritten by Gulp if they have the path `js/scripts.js` or `css/style.css`. 