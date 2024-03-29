import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload');
    this.siteHeader = $('.site-header');
    this.ourBeginning = $('#our-beginning');
    this.logoLink = $('.back-to-the-top');
    this.primaryNavbarLinks = $('.primary-nav a');
    this.pageSection = $('.page-section');
    this.createHeaderWaypoint();
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyImages.on('load', function() {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.logoLink.smoothScroll();
    this.primaryNavbarLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    var obj = this;
    new Waypoint({
      element: obj.ourBeginning[0],
      handler: function(direction) {
        if (direction === 'down') {
          obj.siteHeader.addClass('site-header--dark');
        }
        else {
          obj.siteHeader.removeClass('site-header--dark');
        }
      }
    });
  }

  createPageSectionWaypoints() {
    var obj = this;
    this.pageSection.each(function () {
      var currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === 'down') {
            var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            obj.primaryNavbarLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '40%'
      });
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === 'up') {
            var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            obj.primaryNavbarLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '-40%'
      });
    });
  }
}

export default StickyHeader;
