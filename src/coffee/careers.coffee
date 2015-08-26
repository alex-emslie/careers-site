$ ->
	$.get "http://careers.dev/svgs/svgs.svg", (data) ->
		div = document.createElement("div")
		div.className = "svgstore"
		div.innerHTML = new XMLSerializer().serializeToString(data.documentElement)
		document.body.insertBefore(div, document.body.childNodes[0])
		$('body').removeClass('no-svgs').addClass('svgs-loaded')



  $('#photo-carousel').owlCarousel
    navigation: false
    slideSpeed: 300
    lazyLoad: true
    singleItem: true
    pagination: true
    afterInit : (elem) ->
      that = this
      that.owlControls.appendTo('.photo-carousel .photo-description')

  photoSlide = $('#photo-carousel').data('owlCarousel')

  $('.photo-prev').click ->
    photoSlide.prev()
  $('.photo-next').click ->
    photoSlide.next()

  customPhotoPagination = ->
    target = $(e.target)
    index = $('.custom-slide span').index(target)
    photoSlide.goTo index

  adjustPhotoHeight = ->
    if $(window).width() >= 1024
      photoHeight = $('#photo-carousel').height()
      $('.photo-description').css "height", photoHeight + "px"
    if $(window).width() < 1024
      $('.photo-description').css "height", "auto"
  adjustPhotoHeight()

  $(window).resize ->
    adjustPhotoHeight()

  $('#photo-carousel, .arrow svg').on "mouseover", ->
    $('.arrow svg').css('opacity' , '0.5')
  $('#photo-carousel, .arrow svg').on "mouseleave", ->
    $('.arrow svg').css('opacity' , '0')

	options =
		minOptions: 1

	$('#jobs').ddTableFilter(options)

	$("#jobs th select").wrap("<div class='styled-select'</div>")

	rowCount = $('#jobs tr').length - 1
	$('span#count').text(rowCount)


	$('.burger, .sidebar-close').click ->
		$('.off-canvas, #container, .overlay, body').toggleClass('active')



	matchHeight = ->
		teamIcon = $('.columns.quarter-icon .one-quarter')
		iconWidth = teamIcon.width()
		teamIcon.css "height" , iconWidth
	matchHeight()

	loadWistia = (wistiaEmbed) ->
    $('.video-launch, button.video-launch').click (e) ->
      e.preventDefault()
      wistiaEmbed = $(this).attr('title')
      loadedIframe = $('.iframe-container').html('<iframe src="//fast.wistia.net/embed/iframe/' + wistiaEmbed + '?videoFoam="true" allowtransparency="true" frameborder="0" scrolling="no" id="wistia_video" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="1920" height="1080"></iframe>')
      $(loadedIframe).appendTo('.iframe-container')
      $('.video-modal').modal()
      # $('.iframe-container iframe').on "load", ->
      #   $('.iframe-placeholder').css "opacity" , "0"
  loadWistia()

  emptyIframe = ->
    $('.iframe-container').empty()

  $('.close').click ->
    emptyIframe()
