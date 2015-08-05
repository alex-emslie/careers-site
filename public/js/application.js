(function() {
  $(function() {
    var ad, scrollConfig;
    ad = ad || {};
    $.get("http://info.appdirect.com/assets_new/svg/shapes.svg", function(data) {
      var div;
      div = document.createElement("div");
      div.className = "svgstore";
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
      return $('body').removeClass('no-svgs').addClass('svgs-loaded');
    });
    ad.heroCenter = function() {
      if (matchMedia('only screen and (min-width: 750px)').matches) {
        $('.hero-copy').css({
          "margin-top": ($(window).height() - 188 - $('.hero-copy').outerHeight()) / 2
        });
      }
      if (matchMedia('only screen and (max-width: 750px)').matches) {
        return $('.hero-copy').css({
          "margin-top": "20px"
        });
      }
    };
    ad.heroCenter();
    scrollConfig = {
      complete: function(el) {
        if ($(el).is('.half-width.graph')) {
          $('g#btn-1').tooltip('show');
          return $('g#btn-1').attr("class", "step-1 active");
        }
      }
    };
    ad.sr = new scrollReveal(scrollConfig);
    if (!$('html').is('[class^="ie"]')) {
      $('#graph g[id^="btn"]').hover(function() {
        var target;
        target = $(this).attr('class');
        $('g[class^="step"]').not("." + target).find("path, polygon").css('fill', '#e6e7e7');
        $('#top-icons g[class^="step"]').not(this).find("path, polygon").css('fill', 'transparent');
        $("." + target).find("path, polygon").css('fill', '#133a4e');
        return true;
      }, function() {
        var target;
        target = $(this).attr('class');
        return $('g[class^="step"]').find("path, polygon").css('fill', '');
      });
    }
    $('.ga_push').on("click", function() {
      var text;
      text = $(this).attr("data-eventname");
      return _gaq.push(['_trackEvent', text]);
    });
    $(window).stellar();
    ad.replaceGifs = function() {
      if (matchMedia('only screen and (min-width: 750px)').matches) {
        return $('.js-delay-gif').each(function(index) {
          return $(this).attr('src', $(this).attr('src').replace(/\.jpg|\.png/, ".gif"));
        });
      }
    };
    ad.removeVideo = function() {
      if ($('#headerVid').length > 0) {
        return $('#headerVid').remove();
      }
    };
    ad.replaceVideo = function() {
      if ($('#headerVid').length === 0) {
        $('.videoContainer').append($('<video class="video" id="headerVid" loop="true" muted="true" poster="http://info.appdirect.com/assets_new/imgs/video_placeholder.jpg" autoplay="true" ><!--autobuffer="true"--> <source src="https://embed-ssl.wistia.com/deliveries/47d64fae619ed832386cbd85f40504fb23a3141a/file.mp4" type="video/mp4" media="all and (min-width: 600px)"> </video>'));
        return $('.video').animate({
          opacity: 1
        }, 'slow');
      }
    };
    ad.runBreakpoints = function() {
      if (matchMedia('only screen and (min-width: 750px)').matches) {
        ad.replaceVideo();
        ad.videoHeight();
        ad.replaceGifs();
      }
      if (matchMedia('only screen and (max-width: 750px)').matches) {
        return ad.removeVideo();
      }
    };
    ad.videoHeight = function() {};
    ad.runBreakpoints();
    $(window).resize(function() {
      ad.runBreakpoints();
      return ad.heroCenter();
    });
    $('a.learn-more').click(function() {
      var heroOffset;
      heroOffset = $('.hero .videoContainer').height() - 70;
      return $('body').stop().animate({
        scrollTop: heroOffset
      }, 650);
    });
    $(window).scroll(function() {
      var height;
      height = $(window).scrollTop();
      if (height > 1000) {
        $('.fixed-footer-bg').css("display", "block");
      }
      if (height <= 1000) {
        return $('.fixed-footer-bg').css("display", "none");
      }
    });
    $('.menu-burger, .menu-items').on('click', function() {
      $('.menu-bg, .menu-items, .menu-burger, .mobile-nav .logo').toggleClass('fs');
      $('body').toggleClass('overflow');
      if ($('.menu-burger').text() === '☰') {
        return $('.menu-burger').text('✕');
      } else {
        return $('.menu-burger').text('☰');
      }
    });
    $('.tooltip-active').tooltip();
    $('g[id^="btn"]').hover(function() {
      if ($('g#btn-1').attr("class", "step-1 active")) {
        $('g#btn-1').attr("class", "step-1");
      }
      $('g[id^="btn"]').tooltip('hide');
      return $(this).tooltip('show');
    }, function() {
      return $(this).tooltip('hide');
    });
    $("#btn-1").tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue active" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $("#btn-2").tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $("#btn-3").tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $("#btn-4").tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $("#btn-5").tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    return $("#btn-6").tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
  });

}).call(this);
