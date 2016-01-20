$ ->
  $.get "/svgs/svgs.svg", (data) ->
    div = document.createElement("div")
    div.className = "svgstore"
    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement)
    document.body.insertBefore(div, document.body.childNodes[0])
    $('body').removeClass('no-svgs').addClass('svgs-loaded')

  $('.js-replace-select').chosen(
    width: 'auto'
  )

  itemfilter = {}
  filterItems = (itemfilter) ->
    # filter through .filter-elements
    $.each(itemfilter, (key, value) ->
      $(".filter-element").not("[data-#{key}~='#{value}']").hide()
    )
    # hide unused sections
    # $('.job-entry').each ->
    #   if $(this).find('.filter-element:visible').length == 0
    #     $(this).hide()
    # add no results message
    if $('.filter-element:visible').length == 0
      #console.log "nothing to show"
      $('.filter-group').after($("<h1 class='no-results' style='color: #000;'>We're sorry, but there are no results for your selections. Please <a href='/customers' class='js-filter-reset'>reset</a> or change your filter settings.</h1>"))

  $('.filter-select').on 'change', (e) ->
    e.preventDefault()
    $('.no-results').remove()
    filter = $(this).attr('data-filter')
    value = $(this).val()
    if $(this).find(":selected").hasClass('default') then delete itemfilter[filter] else itemfilter[filter] = value
    #console.log itemfilter
    $("[data-#{filter}], .job-entry").show()
    $('.is-featured:visible').removeAttr("style")
    filterItems(itemfilter)

  $(document).on 'click', '.js-filter-reset', (e) ->
    e.preventDefault()
    itemfilter = {}
    $('.no-results').remove()
    $('.filter-element, .job-entry').show()
    $('.js-replace-select').find('option.default').prop('selected', true).end().trigger('chosen:updated')

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
    $('.value-block').mouseleave(->
      if matchMedia('only screen and (min-width: 800px)').matches
        $(this).find('.info').stop().css 'marginTop', '78%'
      else
        return false
    ).mouseenter ->
      if matchMedia('only screen and (min-width: 800px)').matches
        $(this).find('.info').animate {
          marginTop: '20px'
        }, 200
      else
        return false
    if matchMedia('only screen and (max-width: 800px)')
      $(this).find('.info').stop().css 'marginTop', '0'

  $(window).resize ->
    triggerHover()
  triggerHover()

