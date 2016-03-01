(function() {
  var removeVideo, replaceVideo, runBreakpoints;

  removeVideo = function() {
    if ($('#headerVid').length > 0) {
      return $('#headerVid').remove();
    }
  };

  replaceVideo = function() {
    if ($('#headerVid').length === 0 && $('.videoContainer').length > 0) {
      $('.videoContainer').append($('<video class="video" id="headerVid" loop="true" muted="true" poster="/imgs/video/hero-poster.jpg" autoplay="true" ><!--autobuffer="true"--> <source src="https://embedwistia-a.akamaihd.net/deliveries/31b454f384b84f0e5254f7f86f207e1a66e54038/file.mp4" type="video/mp4" media="all and (min-width: 600px)"> </video>'));
      return $('.video').animate({
        opacity: 1
      }, 'slow');
    }
  };

  runBreakpoints = function() {
    if (matchMedia('only screen and (min-width: 750px)').matches) {
      replaceVideo();
    }
    if (matchMedia('only screen and (max-width: 750px)').matches) {
      return removeVideo();
    }
  };

  $(function() {
    var emptyIframe, filterItems, itemfilter, loadWistia;
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
    runBreakpoints();
    $(window).resize(function() {
      return runBreakpoints();
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
    itemfilter = {};
    filterItems = function(itemfilter) {
      $.each(itemfilter, function(key, value) {
        return $(".filter-element").not("[data-" + key + "~='" + value + "']").hide();
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
    return $('.close').click(function() {
      return emptyIframe();
    });
  });

}).call(this);
