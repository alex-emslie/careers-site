(function() {
  var Megapane;

  Megapane = (function() {
    function Megapane() {
      this.mode = "";
      this.is_open = false;
      this.target = "";
      this.trigger = "";
      this.offset = 0;
      this.template = $("<div class='megapane' id='megapane'><div class='arrow'></div><a href='#' class='close-btn'><svg><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#shape-video_close'></use></svg></a><div class='content'></div></div>");
      this.bindEvents();
    }

    Megapane.prototype.get_target = function() {
      return this.target = (function() {
        switch (matchMedia('only screen and (min-width: 1024px)').matches) {
          case true:
            return $(this.trigger).parents('.row');
          case false:
            return $(this.trigger).parents('.customer-card');
        }
      }).call(this);
    };

    Megapane.prototype.get_contents = function() {
      return $($(this.trigger).attr('href')).html();
    };

    Megapane.prototype.toggle_card_active = function() {
      $('.has-desc').removeClass('active');
      return $(this.trigger).parents('.customer-card').addClass('active');
    };

    Megapane.prototype.close = function(clear_trigger) {
      var e;
      if (clear_trigger == null) {
        clear_trigger = true;
      }
      e = $.Event('close.megapane');
      $(this.trigger).trigger(e);
      $('#megapane').animate({
        height: 'toggle'
      }, 200, function() {
        return $('#megapane').remove();
      });
      $('.has-desc').removeClass('active');
      if (clear_trigger) {
        this.trigger = "";
      }
      return this.is_open = false;
    };

    Megapane.prototype.open = function() {
      var e;
      e = $.Event('open.megapane');
      $(this.trigger).trigger(e);
      this.get_target();
      this.set_arrow_offset();
      this.target.after(this.template.find('.content').html(this.get_contents()).end());
      if (!this.is_open) {
        $('#megapane').animate({
          height: 'toggle'
        }, 200);
      }
      this.toggle_card_active();
      return this.is_open = true;
    };

    Megapane.prototype.set_arrow_offset = function() {
      this.offset = ($(this.trigger).offset().left - $(this.trigger).parents('.row').offset().left) + $(this.trigger).outerWidth() / 2 - 15;
      return this.template.find('.arrow').css('left', this.offset);
    };

    Megapane.prototype.bindEvents = function() {
      $('.js-megapane-toggle').on('click', (function(_this) {
        return function(e) {
          e.preventDefault();
          if (e.target === _this.trigger) {
            return _this.close();
          } else {
            _this.trigger = e.target;
            return _this.open();
          }
        };
      })(this));
      $('.js-megapane-toggle').on('open.megapane', function(e) {
        return $('.js-dropup').tooltip('hide');
      });
      return $(document).on('click', '.megapane .close-btn', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.close();
        };
      })(this));
    };

    return Megapane;

  })();

  $(function() {
    var ad, filterItems, itemfilter, scrollConfig, svgs_url;
    ad = ad || {};
    if (window.location.href.indexOf('github') >= 0) {
      svgs_url = './assets_new/svg/svgs.svg';
    } else if (window.location.href.indexOf('local') === -1) {
      svgs_url = 'http://info.appdirect.com/assets_new/svg/svgs.svg';
    } else {
      svgs_url = '/assets_new/svg/svgs.svg';
    }
    $.get(svgs_url, function(data) {
      var div;
      div = document.createElement("div");
      div.className = "svgstore";
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
      return $('body').removeClass('no-svgs').addClass('svgs-loaded');
    });
    ad.heroCenter = function() {
      if (matchMedia('only screen and (min-width: 750px)').matches && $('.hero-copy').length > 0) {
        $('.hero-copy').css({
          "margin-top": ($('.hero').height() - $('.hero-copy').height() - 65) / 2
        });
      }
      if (matchMedia('only screen and (max-width: 750px)').matches && $('.hero-copy').length > 0) {
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
    if (!$('html').hasClass('ie8')) {
      ad.sr = new scrollReveal(scrollConfig);
    }
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
    ad.replaceGifs = function() {
      if (matchMedia('only screen and (min-width: 750px)').matches) {
        return $('img.js-delay-gif').each(function(index) {
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
      if ($('#headerVid').length === 0 && $('.videoContainer').length > 0) {
        $('.videoContainer').append($('<video class="video" id="headerVid" loop="true" muted="true" poster="http://info.appdirect.com/assets_new/imgs/video_placeholder.jpg" autoplay="true" ><!--autobuffer="true"--> <source src="https://embed-ssl.wistia.com/deliveries/47d64fae619ed832386cbd85f40504fb23a3141a/file.mp4" type="video/mp4" media="all and (min-width: 600px)"> </video>'));
        return $('.video').animate({
          opacity: 1
        }, 'slow');
      }
    };
    ad.runBreakpoints = function() {
      if (matchMedia('only screen and (min-width: 750px)').matches) {
        ad.replaceVideo();
        ad.replaceGifs();
      }
      if (matchMedia('only screen and (max-width: 750px)').matches) {
        return ad.removeVideo();
      }
    };
    ad.runBreakpoints();
    $(window).resize(function() {
      ad.runBreakpoints();
      return ad.heroCenter();
    });
    $('.js-replace-select').chosen({
      disable_search_threshold: 20,
      width: 'auto'
    });
    $('a.learn-more').click(function() {
      var heroOffset;
      heroOffset = $('.hero .videoContainer').height() - 70;
      return $('body').stop().animate({
        scrollTop: heroOffset
      }, 650);
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
    ad.megapane = new Megapane;
    $('.js-dropup').tooltip({
      html: true,
      title: function() {
        return $(this).siblings('.dropup').html();
      },
      trigger: 'manual',
      template: '<div class="tooltip shadow" role="tooltip"><div class="tooltip-inner auto"></div></div>'
    }).on('click', function(e) {
      e.preventDefault();
      $(this).parents('.customer-card').addClass('active');
      $('.js-dropup').not($(this)).tooltip('hide');
      if (ad.megapane.is_open) {
        ad.megapane.close();
      }
      return $(this).tooltip('toggle');
    }).on('hide.bs.tooltip', function(e) {
      return $(this).parents('.customer-card').removeClass('active');
    });
    $('g[id^="btn"]').hover(function() {
      if ($('g#btn-1').attr("class", "step-1 active")) {
        $('g#btn-1').attr("class", "step-1");
      }
      $('g[id^="btn"]').tooltip('hide');
      return $(this).tooltip('show');
    }, function() {
      return $(this).tooltip('hide');
    }).tooltip({
      html: true,
      container: 'body',
      template: '<div class="tooltip blue active" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    itemfilter = {};
    filterItems = function(itemfilter) {
      $.each(itemfilter, function(key, value) {
        return $(".filter-element").not("[data-" + key + "~='" + value + "']").hide();
      });
      $('.customer-cards').each(function() {
        if ($(this).find('.filter-element:visible').length === 0) {
          return $(this).hide();
        }
      });
      if (matchMedia('only screen and (min-width: 750px)').matches) {
        $('.is-featured:visible').each(function(i) {
          if ((i + 1) % 3 === 0) {
            return $(this).css('padding-right', '0');
          } else {
            return $(this).css('padding-right', '18px');
          }
        });
        $('.filter-element:not(.is-featured):visible').each(function(i) {
          if ((i + 1) % 4 === 0) {
            return $(this).css('padding-right', '0');
          } else {
            return $(this).css('padding-right', '18px');
          }
        });
      }
      if ($('.filter-element:visible').length === 0) {
        return $('.filter-group').after($("<h1 class='no-results' style='color: white;'>We're sorry, but there are no results for your selections. Please <a href='/customers' class='js-filter-reset'>reset</a> or change your filter settings.</h1>"));
      }
    };
    $('.filter-select').on('change', function(e) {
      var filter, value;
      e.preventDefault();
      $('.no-results').remove();
      filter = $(this).attr('data-filter');
      value = $(this).val();
      if ($(this).find(":selected").hasClass('default')) {
        delete itemfilter[filter];
      } else {
        itemfilter[filter] = value;
      }
      $("[data-" + filter + "], .customer-cards").show();
      $('.is-featured:visible').removeAttr("style");
      return filterItems(itemfilter);
    });
    return $(document).on('click', '.js-filter-reset', function(e) {
      e.preventDefault();
      itemfilter = {};
      $('.no-results').remove();
      $('.filter-element, .customer-cards').show();
      return $('.js-replace-select').find('option.default').prop('selected', true).end().trigger('chosen:updated');
    });
  });

}).call(this);
