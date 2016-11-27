



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
	- The `/layouts/shortcodes` directory is where can store shortcodes, or reusable html blocks that we can use in any of the content pages.  
		- The core difference between partials and shortcodes is that partials are used in layouts(such as a footer), and shortcodes are used in content(such as a right-aligned image).
- The `/archetypes`, `/data`, and `/themes` directories have some cool roles as well, but we don't need to use them in this sample project. Check out the [Hugo documentation](https://gohugo.io/overview/introduction/) for more info.
- The core project configuration is stored within the `config.toml` file.  The data here is accessible from any template in the `/layouts` directory.  This is where we store top-level data like the site name and the menu configuration.
- The prebuild resources(SCSS, Javascript ES6) are stored in the `/src` directory.
- The built resources(css, javascript, images) are stored in the `/static` directory.
- The `/public` directory is the final product, with the entire generated website.


## Build System

This starter project has a basic [Gulp](http://gulpjs.com/) build system configured.  This allows us to write SCSS and ES6 Javascript in the `/src` directory, and compiles it to minified browser compatible code in the `/static` directory.  It will also optimize any images in the `/src/images` directory.

 - To build all of the resources in the `src` directory, run `gulp` or `gulp build`.
 - To watch the `/src` directory and automatically rebuild when a change is detected, run `gulp watch`. 
 - To build the `/public` directory from the static resources and html templates, run `hugo`.
 - The `hugo server` command serves the site to [ localhost:1313/hugo-starter](http://localhost:1313/hugo-starter/),  automatically watches the project files, and runs a live reload script on the web page whenever a change is made.
 - By running `gulp watch` and `hugo server` at the same time, you can automatically sync resource changes from `/src` directly to the webpage.  As a shortcut for running both watchers at once, use `npm start`.

You can also place prebuilt resources, such as libraries and fonts, directly in the `/static` directory. These will be overwritten

 by Gulp if they have the path `js/scripts.js` or `css/style.css`. 

## How To

### Add a Page

Create a new file called `{pagename}.html` in the  `/content/{section}/ `directory.

At the top of the file, add some metadata, called [Front Matter](https://gohugo.io/content/front-matter/).

Here's an example -

    +++
    title = "Sample Product 1"
    draft = false
    type = "page"
    script = "product.js"
    +++

 - Title - The page title.  This is what will appear in the browser tab.
 - Draft - This will be more useful once the website is in production.  For now just set it to false.
 - Type - The HTML template on which to show the page.  This is where we add the header, footer, etc.  Use "page" for all stand-alone pages.
 - Script - (optional) The javascript file to send with the page, for page specific behavior.  Should correspond to a file in `/src/js/page/`. 

The rest of the file should contain the html for the page content, i.e. whatever is between the header and the footer.  Don't import any external javascript or css files here, it will hurt the SEO and page load.

### Javascript

#### Add javascript to a page

Add a new file in `/src/js/page/` called `{pagetitle}.js`  Add the custom javascript here.  The the page content file, add `script ="{pagetitle}.js"` to the Front Matter metadata.  The script should now download and run whenever the page is visited.

#### Add a javascript library

Add the library JS file to `/src/js/vendor`.  During the Gulp build process it will be minified and combined with all other libraries in the directory, and imported before the page-specific scripts on each page.

#### Add global javascript

For any javascript that should be run on every page, add it to `/src/js/scripts.js`.

### CSS

#### Add a SCSS rule

Add the rule to the appropriate file in the `/src/scss` directory.

#### Add a CSS library

Add the library CSS file to the `/src/css` directory.