(function() {
  $(function() {
    var emptyIframe, filterItems, itemfilter, lastId, loadWistia, menuItems, scrollItems, topMenu, triggerHover;
    $.get("/svgs/svgs.svg", function(data) {
      var div;
      div = document.createElement("div");
      div.className = "svgstore";
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
      return $('body').removeClass('no-svgs').addClass('svgs-loaded');
    });
    $('.js-replace-select').chosen({
      width: 'auto'
    });
    itemfilter = {};
    filterItems = function(itemfilter) {
      $.each(itemfilter, function(key, value) {
        return $(".filter-element").not("[data-" + key + "~='" + value + "']").hide();
      });
      $('.job-entry').each(function() {
        if ($(this).find('.filter-element:visible').length === 0) {
          return $(this).hide();
        }
      });
      if ($('.filter-element:visible').length === 0) {
        return $('.filter-group').after($("<h1 class='no-results' style='color: #000;'>We're sorry, but there are no results for your selections. Please <a href='/customers' class='js-filter-reset'>reset</a> or change your filter settings.</h1>"));
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
      $("[data-" + filter + "], .job-entry").show();
      $('.is-featured:visible').removeAttr("style");
      return filterItems(itemfilter);
    });
    $(document).on('click', '.js-filter-reset', function(e) {
      e.preventDefault();
      itemfilter = {};
      $('.no-results').remove();
      $('.filter-element, .job-entry').show();
      return $('.js-replace-select').find('option.default').prop('selected', true).end().trigger('chosen:updated');
    });
    loadWistia = function(wistiaEmbed) {
      return $('.video-launch, button.video-launch').click(function(e) {
        var loadedIframe;
        e.preventDefault();
        wistiaEmbed = $(this).attr('title');
        loadedIframe = $('.iframe-container').html('<iframe src="//fast.wistia.net/embed/iframe/' + wistiaEmbed + '?videoFoam="true" allowtransparency="true" frameborder="0" scrolling="no" id="wistia_video" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="1920" height="1080"></iframe>');
        $(loadedIframe).appendTo('.iframe-container');
        return $('.video-modal').modal();
      });
    };
    loadWistia();
    emptyIframe = function() {
      return $('.iframe-container').empty();
    };
    $('.close').click(function() {
      return emptyIframe();
    });
    lastId = void 0;
    topMenu = $('.main-nav');
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
      offsetTop = href === '#' ? 0 : $(href).offset().top - topMenu.outerHeight() + 1;
      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 650);
      return e.preventDefault();
    });
    $(window).scroll(function() {
      var cur, fromTop, id;
      fromTop = $(this).scrollTop() + topMenu.outerHeight();
      cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop) {
          return this;
        }
      });
      cur = cur[cur.length - 1];
      id = cur && cur.length ? cur[0].id : '';
      if (lastId !== id) {
        lastId = id;
        menuItems.removeClass('active').filter('[href=#' + id + ']').addClass('active');
      }
      return $('span.current-val').text($('.nav-menu').find('.active').text());
    });
    triggerHover = function() {
      return $('.value-block').mouseleave(function() {
        if (matchMedia('only screen and (min-width: 800px)').matches) {
          return $(this).find('.info').stop().css('marginTop', '78%');
        } else {
          return false;
        }
      }).mouseenter(function() {
        if (matchMedia('only screen and (min-width: 800px)').matches) {
          return $(this).find('.info').animate({
            marginTop: '20px'
          }, 200);
        } else {
          return false;
        }
      });
    };
    $(window).resize(function() {
      return triggerHover();
    });
    return triggerHover();
  });

}).call(this);
