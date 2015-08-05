(function() {
  $(function() {
    var adjustPhotoHeight, customPhotoPagination, photoSlide;
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

}).call(this);
