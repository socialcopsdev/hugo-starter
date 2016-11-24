
# Hugo Hello World Starter Project

## What is this?

[Hugo](https://gohugo.io/) is a static website generator written in Go.  It allows you to write reusable components using simple template syntax, and the generate static html files by combining these templates with different content.  The end result is a "public" directory, containing the compiled html files for each page, along with the necessary resources(CSS, JS, images).  This allows the resulting site to be very easy and cheap to host(using a service such as AWS S3 with Cloudfront for instance), and very fast(since there is no server-side rendering for each page request).


## Setup

This is a small project to show the capabilities and structure of a static website built using [Hugo](https://gohugo.io/).

 1.  Install Hugo using these  [these instructions](https://gohugo.io/overview/installing/).
 2.  Run `npm install` or `yarn` to get the dependencies for the included Gulp build system.
 3. Start the Gulp build-system and file-watching with `gulp`
 4. Run `hugo server` to build the site and visit [localhost:1313/hugo-starter/](http://localhost:1313/hugo-starter/) to view the unstyled template starter site.

## Structure

The Hugo [documentation](https://gohugo.io/overview/introduction/) gives a much better overview of the project structure than me, so check it out.

The `/content` directory is where the meat of the website content is stored.  Files can be organized in any sort of directory structure and can be written in either markdown or plain html.

The `+++` stuff at the top of each file is called "Front Matter", and can hold the metadata for each page.  This metadata can later be accessed in the layouts to dynamically render content.

The `/layouts` directory contains the html building blocks for the website.  The "partials" directory contains reusable html files that we can use in every other template.  This is useful for headers, footers, navbars, and similar common components.  The "pages" directory is where we store the templates for rendering the content in the `/content` directory.

The `/archetypes` and `/data` directories have some cool roles as well, but we don't even need to use them in this sample project. Check out the [Hugo documentation](https://gohugo.io/overview/introduction/) for more info.

The core project configuration is stored within the `config.toml` file.  The data here is accessible from any template in the `layouts` directory.  This is where we store top-level data like the site name and the menu configuration.

## Build System

This starter project has a basic gulp build system configured.  This will allow us the write SCSS and ES6 Javascript in the `/src` directory, and to automatically compile it to browser compatible code in the `/static` directory.  It is also able to optimize images.  To use the build system just run `gulp` to build everything, to to watch the filesystem for changes.  

You can also just put files directly in the static directory, such as libraries and fonts.  These will be accessible from the page templates, and will not be overwritten by Gulp unless they have the path `/js/scripts.js` or `css/style.css`. 