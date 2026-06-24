/*global $, jQuery, alert*/
$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //


  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    var target = $(this.hash);

    if (!this.hash || !target.length) {
      return;
    }

    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.attr('id');
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));

        if (!refElement.length) {
          return;
        }

        if (refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos + 100) {
          $('nav ul li a').removeClass("active");
          currLink.addClass("active");
        }
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: ["TAREK ALEXANDER KHNIJER.", "Interaction Designer.", "UX/UI Designer.", "UX Researcher.", "Scent Interaction Explorer."],
      typeSpeed: 100,
      loop: true,
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 20,
      dots: true,
      nav: false,
      responsiveClass: true,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
    });

  // ========================================================================= //
  //  Reveal on scroll
  // ========================================================================= //

  var revealItems = $('.card, .journal-info, .portfolio-thumbnail, .services-block, .about-descr, .about-img, .contact-contact, #contact form');

  revealItems.each(function(index) {
    $(this)
      .addClass('reveal-on-scroll')
      .css('--reveal-delay', Math.min(index % 4, 3) * 80 + 'ms');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.each(function() {
      revealObserver.observe(this);
    });
  } else {
    revealItems.addClass('is-visible');
  }

  // ========================================================================= //
  //  Floating scent buddy
  // ========================================================================= //

  var scentBuddy = $('.scent-buddy');

  if (scentBuddy.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var playTimer;
    var talkTimer;

    var moveBuddy = function() {
      var maxScroll = Math.max($(document).height() - $(window).height(), 1);
      var progress = $(window).scrollTop() / maxScroll;
      var wave = Math.sin(progress * Math.PI * 8) * 18;
      var drift = (progress - 0.5) * -70;

      scentBuddy.css('--buddy-shift', (wave + drift).toFixed(2) + 'px');
    };

    moveBuddy();
    $(window).on('scroll resize', moveBuddy);

    $(document).on('mousemove', function(e) {
      var buddyBox = scentBuddy[0].getBoundingClientRect();
      var buddyX = buddyBox.left + buddyBox.width / 2;
      var buddyY = buddyBox.top + buddyBox.height / 2;
      var distance = Math.hypot(e.clientX - buddyX, e.clientY - buddyY);
      var tilt = Math.max(Math.min((e.clientX - buddyX) / 18, 10), -10);

      scentBuddy
        .toggleClass('is-curious', distance < 140)
        .css('--buddy-tilt', tilt.toFixed(2) + 'deg');
    });

    scentBuddy.on('click keydown', function(e) {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') {
        return;
      }

      e.preventDefault();
      clearTimeout(playTimer);
      scentBuddy.removeClass('is-playing');

      window.requestAnimationFrame(function() {
        scentBuddy.addClass('is-playing is-curious is-talking');
      });

      playTimer = setTimeout(function() {
        scentBuddy.removeClass('is-playing');
      }, 850);

      clearTimeout(talkTimer);
      talkTimer = setTimeout(function() {
        scentBuddy.removeClass('is-talking');
      }, 2200);
    });
  }

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();

});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function(){

  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-thumbnail',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

})
