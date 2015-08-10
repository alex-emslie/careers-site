(function() {
  $(function() {
    return $('.burger, .close').click(function() {
      return $('.off-canvas, #container').toggleClass('active');
    });
  });

}).call(this);
