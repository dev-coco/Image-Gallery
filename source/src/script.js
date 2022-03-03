jQuery(window).on('load resize', function () {
  $('.menu').mCustomScrollbar({
    theme: 'dark-2',
    scrollInertia: 300,
    autoExpandScrollbar: true,
    advanced: {
			autoExpandHorizontalScroll: true
		}
  })
})

jQuery(document).ready(function () {
  $('.fa-bars, [data-toggle="close"]').on('click', function () {
    $('.sidebar').toggleClass('open')
  })
  $('.menu ul').vmenuModule({
    Speed: 400,
    autostart: false,
    autohide: true
  })
});

(function ($) {
  $.fn.vmenuModule = function (option) {
    let obj, item
    const options = $.extend({
      Speed: 220,
      autostart: true,
      autohide: 1
    }, option)
    obj = $(this)
    item = obj.find('ul').parent('li').children('a')
    item.attr('data-option', 'off')
    item.unbind('click').on('click', function () {
      const a = $(this)
      if (options.autohide) {
        a.parent().parent().find("a[data-option='on']").parent('li').children('ul').slideUp(options.Speed / 1.2,
          function () {
            $(this).parent('li').children('a').attr('data-option', 'off')
            $(this).parent('li').removeClass('show')
          })
      }
      if (a.attr('data-option') == 'off') {
        a.parent('li').children('ul').slideDown(options.Speed,
          function () {
            a.attr('data-option', 'on')
            a.parent('li').addClass('show')
          })
      }
      if (a.attr('data-option') == 'on') {
        a.attr('data-option', 'off')
        a.parent('li').children('ul').slideUp(options.Speed)
        a.parent('li').removeClass('show')
      }
    })
    if (options.autostart) {
      obj.find('a').each(function () {
        $(this).parent('li').parent('ul').slideDown(options.Speed,
          function () {
            $(this).parent('li').children('a').attr('data-option', 'on')
          })
      })
    } else {
      obj.find('a.active').each(function () {
        $(this).parent('li').parent('ul').slideDown(options.Speed,
          function () {
            $(this).parent('li').children('a').attr('data-option', 'on')
            $(this).parent('li').addClass('show')
          })
      })
    }
  }
})(window.jQuery || window.Zepto)

function hdImages () {
  const frame = document.getElementsByTagName('iframe')[0].contentWindow
  let getHtml = frame.document.querySelector('html').innerHTML
  getHtml = getHtml.replace(/ src="https:\/\/drive.google.com\/thumbnail\?id=/g, ' src="https://drive.google.com/thumbnail?authuser=0&sz=w1000&id=')
  frame.document.body.innerHTML = getHtml
  frame.lazyload.run()
  frame.images_zoom()
}

const sideMenu = document.querySelectorAll('.item')
sideMenu.forEach((menu) => {
  menu.onclick = (e) => {
    document.getElementsByTagName('iframe')[0].src = `/image-gallery/${menu.id}/index.html`
  }
})