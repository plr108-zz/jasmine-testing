#Udacity Front-End Web Developer Nanodegree
##Project 6: Feed Reader Testing by Patrick Roche

####[github.com/plr108](https://github.com/plr108)

####[patrick.l.roche@gmail.com](mailto:patrick.l.roche@gmail.com)

This repository contains my submission for Project 6 of the [Udacity Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).

##Project Overview

This project tests a pre-existing web-based application using the [Jasmine JavaScript Testing Framework](http://jasmine.github.io/).  The only file I modified in this project is the [Jasmine specification file](https://github.com/plr108/FrontEndNanodegreeProject6/blob/master/jasmine/spec/feedreader.js).

##Viewing the project on my GitHub page

This project can be viewed [here on my GitHub Page](http://plr108.github.io/portfolio/FEND6/index.html).

##Installing the App

If you would rather install this app, copy all files in the repository to the desired location on your web server.

##Starting the App

After installing the app, start the app by opening index.html (e.g., http://your_domain_name/index.html) in your favorite browser.

##The Feed Reader
The pre-existing application presents feeds of articles from various websites using the [Google Feed Reader API](https://developers.google.com/feed/).  Please see [Udacity's project repository](https://github.com/udacity/frontend-nanodegree-feedreader) for more information on the feed reader app.

###Testing the Feed Reader
Using Jasmine test suites, this project tests that the feed reader is meeting application requirements.  Jasmine test information is displayed at the bottom of the web page.

###The following tests were implemented as required by the project instructions:

####RSS Feeds
This test suite verifies that all RSS Feeds defined for the project are named and have a URL.

####The menu
Verifies the menu is hidden when the app starts and visibility of the menu changes when the menu icon is clicked.

####Initial Entries
Verifies that at least one feed entry is loaded when a feed is loaded.

####New Feed Selection
Verifies that the feed entries change when a new feed is loaded.

### The following bonus tests are above and beyond the required project tests:

####Bonus Test #1: The menu (again)
The required menu test suite checks if visibility of the slide menu changed by checking if a certain CSS class is applied.  This test suite goes a step further
by verifying the 3d transform applied by the CSS class is actually moving
the slide menu laterally as intended.  See comments in [feedreader.js](https://github.com/plr108/FrontEndNanodegreeProject6/blob/master/jasmine/spec/feedreader.js) for more details.

####Bonus Test #2: Tests for a yet-to-be implemented "time posted" feature.
Most feeds list information about when a feed entry is posted.  This test checks for the presence of a time posted message in each entry field.  The test expects the entry to have this format:

    <article class entry="entry"><h2>Article Title</h2><h5>Time Posted</h5></article>

Here is an example of what the Time Posted messages would look like:

![image of what the Time Posted messages would look like](img/time-posted.png)

See comments in [feedreader.js](https://github.com/plr108/FrontEndNanodegreeProject6/blob/master/jasmine/spec/feedreader.js) for more details, including specifics of the valid time posted message formats.  Please note that since the "time posted" feature is not yet implemented, this test suite is expected to fail.