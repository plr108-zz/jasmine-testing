///////////////////////////////////////////////////////////////////////////////
// Udacity Front End Developer Nanodegree Project 6: Feed Reader Testing
// By: Patrick Roche
//     patrick.l.roche@gmail.com
//     https://github.com/plr108
//
// Note: I removed the pre-existing comments in this file for clarity.
//       No other project files were modified in creating this project.
//       See the README for more information on this project.
///////////////////////////////////////////////////////////////////////////////
$(function() {

    describe('RSS Feeds', function() {

        it('are defined.', function() {
            // expect returns false if allFeed is not defined
            expect(allFeeds).toBeDefined();
            // expect returns false if allFeeds is empty
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URL values defined and URL values are not empty.', function() {
            // loop through allFeeds
            for (var i = 0; i < allFeeds.length; i++) {
                // expect returns false if url is empty
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('have name values defined and name values are not empty.', function() {
            // loop through allFeeds
            for (var i = 0; i < allFeeds.length; i++) {
                // expect returns false if name is empty
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        // the menu-hidden css class controls menu visibility.
        // Test if .menu-hidden is applied to body at app start.
        it('is hidden by default.', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

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

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            // remove all child nodes from .feed
            $('.feed').empty();

            // load the first feed
            loadFeed(0, done);
        });

        it('exist after a feed is loaded.', function() {
            // expect .feed has at least one .entry child element
            expect($('.feed').has('.entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {

        var firstLink = null;
        var secondLink = null;

        beforeEach(function(done) {
            // remove all child nodes from .feed
            $('.feed').empty();

            // load the first feed,
            // then execute callback function
            loadFeed(0, function() {
                // save the href attribute of the first entry
                firstLink = $('.feed .entry-link').first().attr("href");

                // load the second feed,
                // then execute callback function
                loadFeed(1, function() {
                    // save the href attribute of the first entry
                    secondLink = $('.feed .entry-link').first().attr("href");
                    done();
                });
            });
        });

        it('actually changes the content.', function() {
            // expect the hrefs to be different since we changed feeds
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

    // getTranslateX returns the Translate-X (tx) value in a transformMatrix.
    // transformMatrix format = (a, b, c, d, tx, ty)
    // Source for format: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    var getTranslateX = function(transformMatrix) {
        var lastComma = transformMatrix.lastIndexOf(",");
        var secondToLastComma = transformMatrix.substring(0, lastComma).lastIndexOf(",");
        var tx = transformMatrix.substring(secondToLastComma + 1, lastComma).trim();
        return tx;
    };

    describe('The menu (again)', function() {

        var tx_before = null;
        var tx_after = null;

        beforeEach(function(done) {
            // Get translateX before clicking the icon-list
            tx_before = getTranslateX($('.slide-menu').css('transform'));

            // Simulate clicking the icon-list
            $('.icon-list').trigger('click');

            setTimeout(function() {
                // Wait 500ms
                // Waiting gives this CSS transition time to complete --> transition: transform 0.2s;
                // I originally had a 250ms wait, but up to 500ms may be necessary for testing on mobile devices
                done();
            }, 500);
        });

        it('moves laterally when the menu icon is clicked.', function() {
            // Get translateX after clicking the icon-list
            tx_after = getTranslateX($('.slide-menu').css('transform'));

            // Body font is 16px.
            // CSS transform is by 12em in the X direction --> transform: translate3d(-12em, 0, 0)
            // 12em at 16px = 192 px (Source: http://www.w3schools.com/tags/ref_pxtoemconversion.asp)
            // The expected difference between tx_before and tx_after is 192px
            expect(Math.abs(tx_before - tx_after)).toEqual(192);
        });

        it('moves laterally when the menu icon is clicked again.', function() {
            // Get translateX after clicking the icon-list
            tx_after = getTranslateX($('.slide-menu').css('transform'));

            // The expected difference between tx_before and tx_after is 192px
            expect(Math.abs(tx_before - tx_after)).toEqual(192);
        });
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Bonus Test #2: Testing a "time posted" future.  Most feeds list information about when an
    // entry is posted.  This test checks for the presence of a time posted message in each
    // .entry.  The time posted message will be present in the .entry element after the article
    // title, and .entry will have this format:
    //
    //        <article class entry="entry"><h2>Article Title</h2><h5>Time Posted</h5></article>
    //
    // The format of Time Posted will vary depending on how old the post is:
    //     If post is less than a minute old: <h5>Posted XX seconds ago</h5>
    //     If post is at least a minute old but less than 1 hour old: <h5>Posted XX minutes ago</h5>
    //     If post is at least an hour old but less than 2 hours old: <h5>Posted an hour ago</h5>
    //     If post is at least 2 hours old but less than a day old: <h5>Posted XX hours ago</h5>
    //     If post is at least a day old but less than 2 days old: <h5>Posted yesterday</h5>
    //     If post is at least two days old but less than 99 days old: <h5>Posted XX days ago</h5>
    //    If post is at least 99 days old: <h5>Posted a long time ago</h5>
    // In the formats above "XX" represents a one or two digit number
    // Note: This test suite is expected to fail right now as this functionality is not yet implemented.
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    describe('The Entries', function() {

        // ValidateTimePostedMessage returns true if and only if message string matches any of the valid message formats:
        // Posted XX seconds ago
        // Posted XX minutes ago
        // Posted an hour ago
        // Posted XX hours ago
        // Posted yesterday
        // Posted XX days ago
        // Posted a long time ago
        // In the formats above "XX" represents a one or two digit number
        var ValidateTimePostedMessage = function(message) {

            // Check for the valid non-numeric messages first
            if (message === "Posted yesterday" || message === "Posted an hour ago" || message === "Posted a long time ago") {
                return true;
            }

            // The start of the string should be "Posted "
            // Check if the first two characters after "Posted " are a valid number.
            // Note that both "XX" and " X" (where X represents a digit) are valid.

            // if the substring is an illegal number
            if (isNaN(message.substring(7, 9))) {
                return false;
            } else {
                // Check if the rest of the message after the numeric value is valid
                var restOfMessage = message.substring(9).trim();
                if (restOfMessage === 'seconds ago' || restOfMessage === 'minutes ago' || restOfMessage === 'hours ago' || restOfMessage === 'days ago') {
                    return true;
                } else {
                    return false;
                }
            }
        };

        beforeEach(function(done) {
            // Remove all child nodes from .feed
            $('.feed').empty();

            // Load a feed
            loadFeed(0, done);
        });

        it('have valid Time Posted messages.', function() {

            // if there are entries present
            if ($('.feed .entry').length > 0) {
                var entry = null;

                // for each entry in the feed
                for (var i = 0; i < $('.feed .entry').length; i++) {
                    entry = $('.feed .entry').eq(i).text().trim

                    // look for "Posted" starting at end of string
                    var TimePostedMessage = entry.substring(entry.lastIndexOf("Posted"), entry.length);

                    // check the format of posted note
                    expect(ValidateTimePostedMessage(TimePostedMessage)).toEqual(true);
                }
            }
        });
    });
}());
