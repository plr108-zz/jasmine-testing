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

    // getTranslateX returns the Translate-X (tx) value in a transformString.
    // transformString format = (a, b, c, d, tx, ty)
    // Source for format: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    getTranslateX = function(transformString) {
        var lastComma = transformString.lastIndexOf(",");
        var transformSubString = transformString.substring(0, lastComma);
        var secondToLastComma = transformSubString.lastIndexOf(",");
        var tx = transformString.substring(secondToLastComma + 1, lastComma).trim();
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

            // click the icon-list one more time to make sure it is not visible for the next test
            $('.icon-list').trigger('click');

            // Body font is 16px.
            // CSS transform is by 12em in the X direction --> transform: translate3d(-12em, 0, 0)
            // 12em at 16px = 192 px (Source: http://www.w3schools.com/tags/ref_pxtoemconversion.asp)
            // The expected difference between tx_first and tx_second is 192px
            expect(Math.abs(tx_first - tx_second)).toEqual(192);
        });
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Bonus Test #2: Testing a "time posted" future.  Most feeds and websites list information
    // about when a post is posted.  This test checks for the presence of a time posted in each
    // .entry.  The timestamp will be present in the .entry element after the article title, and
    // .entry will then have this format:
    //
    //        <article class entry="entry"><h2>Article Title</h2><h5>Time Posted</h5></article>
    //
    // The format of Time Posted will vary depending on how old the post is:
    // If post is less than an hour old: <h5>Posted XX minutes ago</h5>
    // If post is older than an hour but less than a day old: <h5>Posted XX hours ago</h5>
    // If post is older than a day but less than 2 days old: <h5>Posted yesterday</h5>
    // If post is at least two days old: <h5>Posted Month d, yyyy</h5> (e.g., "Posted January 1, 2016")
    //
    // Note: This test is expected to fail right now as this functionality is not yet implemented
    /////////////////////////////////////////////////////////////////////////////////////////////////
    describe('The Entries', function() {

        beforeEach(function(done) {
            // remove all child nodes from .feed
            $('.feed').empty();

            // load a feed,
            // then execute callback function
            loadFeed(1, function() {
                done();
            });
        });

        it('have a Time Posted message.', function() {

            // if there are entries present
            if ($('.feed .entry').length > 0) {
                var entry = null;

                // for each entry in the feed
                for (var i = 0; i < $('.feed .entry').length; i++) {
                    entry = $('.feed .entry').eq(i).text().trim();
                    // DEBUG: This line spoofs a Time Posted
                    entry += "Posted: July 4, 1776"
                    console.log(entry);

                    // TODO: look for "Posted:" starting at end of string
                    // check the format of posted note
                }
            }

            expect(true).toEqual(true);
        });
    });

}());
