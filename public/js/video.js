(function() {
  $(function() {
    var customVideoPagination, emptyIframe, loadWistia, resizeControls, videoSlide;
    $('.video-placeholder').owlCarousel({
      navigation: false,
      slideSpeed: 300,
      lazyLoad: true,
      paginationSpeed: 400,
      singleItem: true,
      mouseDrag: false,
      touchDrag: false,
      pagination: false
    });
    videoSlide = $('.video-placeholder').data('owlCarousel');
    customVideoPagination = function() {
      return $('.custom-slide img').click(function(e) {
        var buttonTitle, display, index, target;
        target = $(e.target);
        index = $('.custom-slide img').index(target);
        display = $('.slide')[index];
        buttonTitle = $(this).attr('title');
        $(this).parent().siblings().children().removeClass('active');
        $(this).addClass('active');
        $('.active-on').removeClass('on');
        $(this).siblings().addClass('on');
        videoSlide.goTo(index);
        $(display).fadeIn('slow');
        $(display).siblings().hide();
        $(display).children().fadeIn('slow');
        $('button.video-launch').attr('title', buttonTitle);
        if (matchMedia('only screen and (max-width: 1199px)').matches) {
          if (index === 0 || index === 4) {
            return $('button.video-launch').css("display", "none");
          } else {
            return $('button.video-launch').css("display", "block");
          }
        }
      });
    };
    customVideoPagination();
    resizeControls = function() {
      var iframeHeight;
      iframeHeight = $(".iframe-container iframe").height();
      return $('.video-modal.in .controls').css("height", iframeHeight + "px");
    };
    resizeControls();

    /*
     * Welcome to the new js2coffee 2.0, now
     * rewritten to use the esprima parser.
     * try it out!
     */
    $(window).resize(function() {
      resizeControls();
      if (matchMedia('only screen and (min-width: 1200px)').matches) {
        return $('button.video-launch').css("display", "none");
      }
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
    return $('span.close').click(function() {
      return emptyIframe();
    });
  });

}).call(this);
