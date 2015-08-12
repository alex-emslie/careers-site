(function() {
  $(function() {
    var emptyIframe, loadWistia, matchHeight;
    $.get("http://info.appdirect.com/assets_new/svg/shapes.svg", function(data) {
      var div;
      div = document.createElement("div");
      div.className = "svgstore";
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
      return $('body').removeClass('no-svgs').addClass('svgs-loaded');
    });
    $('#jobs').ddTableFilter();
    $('.burger, .close').click(function() {
      return $('.off-canvas, #container, .overlay, body').toggleClass('active');
    });
    matchHeight = function() {
      var iconWidth, teamIcon;
      teamIcon = $('.columns.teams .one-quarter');
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
    return $('span.close').click(function() {
      return emptyIframe();
    });
  });

}).call(this);
