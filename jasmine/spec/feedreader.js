/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined.', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL values defined and URL values are not empty.', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // .length returns 0 for an empty string
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name values defined and name values are not empty.', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // the menu-hidden class controls menu visibility.
        // Test if menu-hidden is applied to the body at app start.
        it('is hidden by default.', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked.', function() {

            // simulate clicking the menu icon
            $('.icon-list').trigger('click');

            // expect menu to be visible on first click
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.icon-list').trigger('click');

            // expect menu to be hidden on second click
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            // remove all child nodes from .feed
            $('.feed').empty();

            // load the first feed
            loadFeed(0, done);
        });

        it('exist after a feed is loaded.', function() {

            // If .feed has at least one .entry child element .length returns 1.
            // Otherwise 0 is returned.
            expect($('.feed').has('.entry').length).not.toBe(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var firstLink = null;
        var secondLink = null;

        beforeEach(function(done) {
            // remove all child nodes from .feed
            $('.feed').empty();

            // load the first feed,
            // then execute callback function
            loadFeed(0, function() {
                firstLink = $('.feed .entry-link').first().attr("href");

                // load the second feed,
                // then execute callback function
                loadFeed(1, function() {
                    secondLink = $('.feed .entry-link').first().attr("href");
                    done();
                });
            });
        });

        it('actually changes the content.', function() {

            expect(firstLink).not.toEqual(secondLink);
        });
    });




    /////////////////////////////////////////////////////////////////////////////////////////////////
    // And now for something Completely Udacious...
    // The following tests are intended to meet the 'Exceeds Expectations'
    // requirements for Test Coverage and Test Results
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Bonus Test #1: Testing that visibility of the menu changes when the menu icon is
    // clicked WITHOUT checking CSS classes.  This test checks if the CSS transform function
    // is actually moving the menu laterally as intended.
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // getTranslateX returns the Translate-X (tx) value in a transformString.
    // transformString format = (a, b, c, d, tx, ty)
    // Source for format: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    getTranslateX = function(transformString) {
        var lastComma = transformString.lastIndexOf(",");
        var transformSubString = transformString.substring(0, lastComma);
        var secondToLastComma = transformSubString.lastIndexOf(",");
        var tx = transformString.substring(secondToLastComma + 1, lastComma).trim();
        // write tx to console
        console.log(tx);
        return tx;
    };
    describe('The menu (again)', function() {
        it('changes visibility when the menu icon is clicked (and I can tell without checking the CSS classes applied to body).', function() {
            var tx_first = null;
            var tx_second = null;

            // get transform before clicking the icon-list
            tx_first = getTranslateX($('.slide-menu').css('transform'));

            // simulate clicking the icon-list
            $('.icon-list').trigger('click');

            setTimeout(function() {
                // wait 250ms to get transform value.
                // Waiting gives this CSS transition time to complete --> transition: transform 0.2s;
                tx_second = getTranslateX($('.slide-menu').css('transform'));
            }, 250);

            // Body font is 16px.
            // CSS transform is by 12em in the X direction --> transform: translate3d(-12em, 0, 0)
            // 12em at 16px = 192 px (Source: http://www.w3schools.com/tags/ref_pxtoemconversion.asp)
            // The expected difference between tx_first and tx_second is 192px
            expect(Math.abs(tx_first - tx_second)).toEqual(192);
        });
    });
}());
