$ ->
	$.get "http://info.appdirect.com/assets_new/svg/shapes.svg", (data) ->
		div = document.createElement("div")
		div.className = "svgstore"
		div.innerHTML = new XMLSerializer().serializeToString(data.documentElement)
		document.body.insertBefore(div, document.body.childNodes[0])
		$('body').removeClass('no-svgs').addClass('svgs-loaded')

	options =
		minOptions: 2

	$('#jobs').ddTableFilter(options)

	$("#jobs th select").wrap("<div class='styled-select'</div>")

	$('.burger, .sidebar-close').click ->
		$('.off-canvas, #container, .overlay, body').toggleClass('active')

	matchHeight = ->
		teamIcon = $('.columns.teams .one-quarter')
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
