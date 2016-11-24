


# Hugo Hello World Starter Project

## What is this?

This is a small project to show the capabilities and structure of a website built using [Hugo](https://gohugo.io/), a static website generator written in Go.  

It allows you to write reusable website components and pages using simple html template syntax, and to generate static html files by combining these templates with different content.  The end result is a "public" directory, containing the compiled html files for each page, along with the necessary resources(CSS, JS, images).  

Hugo enables teams to quickly build and iterate upon complex static websites.  The resulting site is easy and cheap to host using an enterprise-grade service such as [AWS Cloudfront](https://aws.amazon.com/cloudfront/), and very fast since there is no server-side rendering for each page request.


## Setup


 1.  Install Hugo using these  [these instructions](https://gohugo.io/overview/installing/).
 2.  Run `npm install` or `yarn` to get the dependencies for the included Gulp build system.
 3.  Build resources by running `gulp`
 4.  Run `hugo server` to build the site and visit [localhost:1313/hugo-starter/](http://localhost:1313/hugo-starter/) to view it.


## Structure

The Hugo [documentation](https://gohugo.io/overview/introduction/) gives a much better overview of the project structure than me, so check it out.

The `/content` directory is the core website content is stored.  Files can be organized in any sort of directory structure and can be written in either markdown or plain html.

The `+++` stuff at the top of each file is called "Front Matter", and can hold the metadata for each page.  This metadata can later be accessed in the layouts to dynamically render content.

The `/layouts` directory contains the html building blocks for the website.  The `/partials` directory contains reusable html files that we can use in every other template.  This is useful for headers, footers, navbars, and other common components.  The `/pages` directory is where we store the templates for rendering the content in the `/content` directory.

The `/archetypes` and `/data` directories have some cool roles as well, but we don't even need to use them in this sample project. Check out the [Hugo documentation](https://gohugo.io/overview/introduction/) for more info.

The core project configuration is stored within the `config.toml` file.  The data here is accessible from any template in the `layouts` directory.  This is where we store top-level data like the site name and the menu configuration.


## Build System

This starter project has a basic gulp build system configured.  This will allow us the write SCSS and ES6 Javascript in the `/src` directory, and to automatically compile it to browser compatible code in the `/static` directory.  It will also optimize any images in the `/images` directory.  

To build all of the resources in the `src` directory, run `gulp` or `gulp build`.  To watch the `/src` directory and automatically rebuild when a change is detected, run `gulp watch`.   The `hugo server` command automatically watches the `/static` directory and runs a live reload script on the webpage, so you can sync resource changes automatically from the the `/src` directory to the webpage by running `gulp watch` and `hugo server` at the same time. 
As a shortcut for running both watchers at once, use `npm start`.

The `/static`  directory is the destination for the gulp resource builds, and is bundled with the build html pages when Hugo generates the website.  
 
You can also place prebuilt files, such as libraries and fonts, directly in the `/static` directory. These will be overwritten by Gulp if they have the path `js/scripts.js` or `css/style.css`. 