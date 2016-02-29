(function() {
  var fireCounter, lastId, menuItems, scrollItems, topMenu;

  fireCounter = true;

  if ($('.js-animate-scroll')[0]) {
    console.log('animated');
    $(window).scroll(function() {
      var animateBottom, animateClouds, animateGraph, animateLeft, animateRight;
      animateGraph = function() {
        var countDelay;
        if (fireCounter === true) {
          if ($(this).scrollTop() >= $('#trigger1').offset().top - 500) {
            $('#GREEN_CIRCLE, #BLUE_CIRCLE').attr("class", "zap");
            $('.count').each(function() {
              $('#blue-text, #green-text').addClass('fade-number');
              return $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
              }, {
                duration: 1000,
                step: function(now) {
                  return $(this).text(Math.ceil(now));
                }
              });
            });
            countDelay = function() {
              return $('.count-delay').each(function() {
                $('#green-text').addClass('fade-number');
                return $(this).prop('Counter', 0).animate({
                  Counter: $(this).text()
                }, {
                  duration: 1000,
                  step: function(now) {
                    return $(this).text(Math.ceil(now));
                  }
                });
              });
            };
            setTimeout(countDelay, 250);
            return fireCounter = false;
          }
        }
      };
      animateClouds = function() {
        if ($(this).scrollTop() >= $('#trigger2').offset().top - 500) {
          return $("#sun").attr("class", "bounceInUp animated");
        }
      };
      if ($(this).scrollTop() >= $('#trigger3').offset().top - 500) {
        animateBottom = function() {
          return $(".logo_bottom").animate({
            opacity: 0.9,
            easing: "ease-in-out"
          });
        };
        setTimeout(animateBottom, 0);
        animateRight = function() {
          return $(".logo_right").animate({
            opacity: 0.9,
            easing: "ease-in-out"
          });
        };
        setTimeout(animateRight, 150);
        animateLeft = function() {
          return $(".logo_left").animate({
            opacity: 0.9,
            easing: "ease-in-out"
          });
        };
        setTimeout(animateLeft, 300);
      }
      animateGraph();
      return animateClouds();
    });
  }

  $('.info-box a').click(function(e) {
    var $this, contentBox, infoBox, target, targetID;
    e.preventDefault();
    $this = $(this);
    contentBox = $('.content-box');
    infoBox = $('.info-box a');
    target = $this.attr('href');
    targetID = $(target);
    contentBox.removeClass('active');
    targetID.addClass('active');
    infoBox.removeClass('active');
    return $this.addClass('active');
  });

  if ($('.js-scroll-hook')[0]) {
    lastId = void 0;
    topMenu = $('.button-selector');
    menuItems = topMenu.find('a');
    scrollItems = menuItems.map(function() {
      var item;
      item = $($(this).attr('href'));
      if (item.length) {
        return item;
      }
    });
    menuItems.click(function(e) {
      var href, offsetTop;
      href = $(this).attr('href');
      offsetTop = href === '#' ? 0 : $(href).offset().top - topMenu.outerHeight() - 65;
      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 650);
      return e.preventDefault();
    });
  }

}).call(this);
