$ ->
	$.get "/svgs/svgs.svg", (data) ->
		div = document.createElement("div")
		div.className = "svgstore"
		div.innerHTML = new XMLSerializer().serializeToString(data.documentElement)
		document.body.insertBefore(div, document.body.childNodes[0])
		$('body').removeClass('no-svgs').addClass('svgs-loaded')

	options =
		minOptions: 1

	$('#jobs').ddTableFilter(options)

	$("#jobs th select").wrap("<div class='styled-select'</div>")

	rowCount = $('#jobs tr').length - 1
	$('span#count').text(rowCount)

	switched = false

	updateTables = ->
	  if $(window).width() < 767 and !switched
	    switched = true
	    $('table.responsive').each (i, element) ->
	      splitTable $(element)
	      return
	    return true
	  else if switched and $(window).width() > 767
	    switched = false
	    $('table.responsive').each (i, element) ->
	      unsplitTable $(element)
	      return
	  return

	splitTable = (original) ->
	  original.wrap '<div class=\'table-wrapper\' />'
	  copy = original.clone()
	  copy.find('td:not(:first-child), th:not(:first-child)').css 'display', 'none'
	  copy.removeClass 'responsive'
	  original.closest('.table-wrapper').append copy
	  copy.wrap '<div class=\'pinned\' />'
	  original.wrap '<div class=\'scrollable\' />'
	  setCellHeights original, copy
	  return

	unsplitTable = (original) ->
	  original.closest('.table-wrapper').find('.pinned').remove()
	  original.unwrap()
	  original.unwrap()
	  return

	setCellHeights = (original, copy) ->
	  tr = original.find('tr')
	  tr_copy = copy.find('tr')
	  heights = []
	  tr.each (index) ->
	    self = $(this)
	    tx = self.find('th, td')
	    tx.each ->
	      height = $(this).outerHeight(true)
	      heights[index] = heights[index] or 0
	      if height > heights[index]
	        heights[index] = height
	      return
	    return
	  tr_copy.each (index) ->
	    $(this).height heights[index]
	    return
	  return

	$(window).load updateTables
	$(window).on 'redraw', ->
	  switched = false
	  updateTables()
	  return
	# An event to listen for
	$(window).on 'resize', updateTables



	$('.burger, .sidebar-close').click ->
		$('.off-canvas, #container, .overlay, body').toggleClass('nav-active')



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

	# Cache selectors
	lastId = undefined
	topMenu = $('.main-nav')
	menuItems = topMenu.find('a')
	scrollItems = menuItems.map(->
	  item = $($(this).attr('href'))
	  if item.length
	    return item
	)
	# Bind click handler to menu items
	# so we can get a fancy scroll animation
	menuItems.click (e) ->
	  href = $(this).attr('href')
	  offsetTop = if href == '#' then 0 else $(href).offset().top - topMenu.outerHeight() + 1
	  $('html, body').stop().animate { scrollTop: offsetTop }, 650
	  e.preventDefault()
	# Bind to scroll
	$(window).scroll ->
	  # Get container scroll position
	  fromTop = $(this).scrollTop() + topMenu.outerHeight()
	  # Get id of current scroll item
	  cur = scrollItems.map(->
	    if $(this).offset().top < fromTop
	      return this
	  )
	  # Get the id of the current element
	  cur = cur[cur.length - 1]
	  id = if cur and cur.length then cur[0].id else ''
	  if lastId != id
	    lastId = id
	    # Set/remove active class
	    menuItems.removeClass('active').filter('[href=#' + id + ']').addClass 'active'
	  $('span.current-val').text $('.nav-menu').find('.active').text()



	triggerHover = ->
		if window.matchMedia('(max-width: 800px)').matches
			$('.value-block .info').css 'margin-top' , '0'
			$('.value-block').mouseleave(->
				$(this).find('.info').stop().css 'marginTop', '0'
			).mouseenter ->
				$(this).find('.info').animate {
					marginTop: '0'
				}
		else
			$('.value-block .info').css 'margin-top' , '82%'
			$('.value-block').mouseleave(->
				$(this).find('.info').stop().css 'marginTop', '82%'
			).mouseenter ->
				$(this).find('.info').animate {
					marginTop: '30px'
				}, 200

	$(window).resize ->
		triggerHover()

	triggerHover()