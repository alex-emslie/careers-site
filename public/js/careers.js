(function() {
  $(function() {
    var emptyIframe, loadWistia, matchHeight, options, rowCount;
    $.get("/svgs/svgs.svg", function(data) {
      var adjustPhotoHeight, customPhotoPagination, div, photoSlide;
      div = document.createElement("div");
      div.className = "svgstore";
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
      $('body').removeClass('no-svgs').addClass('svgs-loaded');
      $('#photo-carousel').owlCarousel({
        navigation: false,
        slideSpeed: 300,
        lazyLoad: true,
        singleItem: true,
        pagination: true,
        afterInit: function(elem) {
          var that;
          that = this;
          return that.owlControls.appendTo('.photo-carousel .photo-description');
        }
      });
      photoSlide = $('#photo-carousel').data('owlCarousel');
      $('.photo-prev').click(function() {
        return photoSlide.prev();
      });
      $('.photo-next').click(function() {
        return photoSlide.next();
      });
      customPhotoPagination = function() {
        var index, target;
        target = $(e.target);
        index = $('.custom-slide span').index(target);
        return photoSlide.goTo(index);
      };
      adjustPhotoHeight = function() {
        var photoHeight;
        if ($(window).width() >= 1024) {
          photoHeight = $('#photo-carousel').height();
          $('.photo-description').css("height", photoHeight + "px");
        }
        if ($(window).width() < 1024) {
          return $('.photo-description').css("height", "auto");
        }
      };
      adjustPhotoHeight();
      $(window).resize(function() {
        return adjustPhotoHeight();
      });
      $('#photo-carousel, .arrow svg').on("mouseover", function() {
        return $('.arrow svg').css('opacity', '0.5');
      });
      return $('#photo-carousel, .arrow svg').on("mouseleave", function() {
        return $('.arrow svg').css('opacity', '0');
      });
    });
    options = {
      minOptions: 1
    };
    $('#jobs').ddTableFilter(options);
    $("#jobs th select").wrap("<div class='styled-select'</div>");
    rowCount = $('#jobs tr').length - 1;
    $('span#count').text(rowCount);
    $('.burger, .sidebar-close').click(function() {
      return $('.off-canvas, #container, .overlay, body').toggleClass('nav-active');
    });
    matchHeight = function() {
      var iconWidth, teamIcon;
      teamIcon = $('.columns.quarter-icon .one-quarter');
      iconWidth = teamIcon.width();
      return teamIcon.css("height", iconWidth);
    };
    matchHeight();
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
    return $('.value-block').mouseleave(function() {
      return $(this).find('.info').stop().css('marginTop', '100%');
    }).mouseenter(function() {
      return $(this).find('.info').animate({
        marginTop: '0'
      }, 200);
    });
  });

}).call(this);
