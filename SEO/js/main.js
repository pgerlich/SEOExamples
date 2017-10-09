var isMobile = function() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 return	true;
	} else {
		return false
	}
}

if (isMobile()) {
	$("body").addClass("mobile")
	if( /Android/i.test(navigator.userAgent) ) {
		$('body').addClass('android')
	}
}

var contentslider

$().ready(function(){

	// Featured attorney image dimension

	if (Math.random() >=0.5) {
			$(".footer-logo-1").hide();
			$(".footer-logo-2").css('display', 'inline-block');
		}

	if ( $(".featured-attoney-photo img").length > 0){
		tmpW = $(".featured-attoney-photo img").data('width')
		tmpH = $(".featured-attoney-photo img").data('height')

		if (tmpH > tmpW) {
			$(".featured-attoney-photo img").css('width', '305px')
		} else {
			$(".featured-attoney-photo img").css('height', '305px')
		}
	}

	if ( $("ul.hero-slider li").length > 1) {
		var hpSlider = $('.hero-slider').bxSlider({
			mode: 'fade',
			pager: false,
			touchEnabled: false,
			adaptiveHeight: true,
			startAuto: true,
			auto: true,
			pause: 8000,
			nextText: '',
			prevText: '',
			onSliderLoad: function(){
				$(".bx-has-controls-direction").appendTo('.slider-control-container')
			}
		});
	}

	contentslider = $('.content-slider').bxSlider({
		mode: 'fade',
		controls: false,
		pagerCustom: 'ul.tabs.js-dd',
		speed: 500,
		startSlide: startIndex,
		adaptiveHeight: true,
		touchEnabled: false,
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			window.location.hash = $('.content-slider .slide:eq(' + newIndex + ')').data('hash');
		},
		onSlideAfter: function($slideElement, oldIndex, newIndex){
			//setAsideHeight();
		},
		onSliderLoad: function(currentIndex){
			$('ul.tabs.js-dd li:eq(' + currentIndex + ')').addClass('on')
			$(".js-place-holder").html($('ul.tabs.js-dd li:eq(' + currentIndex + ')').text())
		}
	});

	var height = screen.height/4;

	if ( $(".share-fancybox").length > 0 ) {
		$(".share-fancybox").click(function(e){
			$.fancybox({
			'width' : 16/9. * height+50,
			'height' : height,
		   'href'          : this.href,
		   'type'          : 'iframe',
		   'autoDimensions' : false,
		   'autoScale'     : false,
			});
			return false;
		});
	}

	if ( $(".video-fancybox").length > 0 ) {
		$(".video-fancybox").fancybox({
				maxWidth	: 800,
				maxHeight	: 600,
				fitToView	: false,
				width		: '70%',
				height		: '70%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'elastic',
				closeEffect	: 'none'
		});
	}

	textCopyHeightCalc()
	adjustVideoTextHeight()
})

$(window).resize(function() {
	//textCopyHeightCalc()
	adjustVideoTextHeight()
})

$(window).bind('orientationchange', function(event) {
  textCopyHeightCalc()
});

var adjustVideoTextHeight = function(){
	if ( $(".video-wrapper .txt").length > 0) {
		$(".video-wrapper .txt").css('height', 'auto')
		var maxHeight = -1;
		$(".video-wrapper .txt").each(function(){
			if ($(this).height() > maxHeight)
        maxHeight = $(this).height();
		})

		$(".video-wrapper .txt").each(function(){
    	$(this).height(maxHeight);
		});
	}
}

var textCopyHeightCalc = function() {
	if ( $('.text-copy').length > 0 ) { 
		$('.text-copy .main-content-height').attr('style','').attr("data-height", '').attr("data-heightshort", "")
		$('.text-copy').addClass('tmp');
 		tmpH = $('.text-copy.tmp .main-content-height').height();
		$('.text-copy.tmp').removeClass("tmp");

		if ( $(window).width() < 992) {
			if (tmpH > 400) {
				$(".text-copy").addClass('exceeds-length');
				$('.text-copy .main-content-height').height(400)
			} else {
				$('.text-copy').addClass('tmp');
			}
		} else {
			tmpR = $('.text-copy').parents('.row').height();
			$(".text-copy").attr("data-height", tmpH + "px").attr("data-heightshort", (tmpR - 100)+"px")
			if ((tmpH > 480) && (tmpH > tmpR)) {
   			$(".text-copy").addClass('exceeds-length')
   			$('.text-copy .main-content-height').height(tmpR - 50)
   		} else {
   			$('.text-copy').addClass('tmp');
   		}
		}
		if ( (typeof(contentslider)!='undefined') && (typeof(contentslider.reloadSlider) !='undefined') ){
			contentslider.reloadSlider()
		}
	}
}

var urlParts = location.hash.split('#');
var anchor = urlParts[1];
var startIndex;
if(anchor){
	startIndex = $('[data-hash="' + anchor + '"]').index();
	if(startIndex == -1){
		startIndex = 0;
	}
} else {
	startIndex = 0;
}


$('.js-search-trigger').click(function(){
	$('form.search-form').slideToggle('fast')
})

$('.js-show-moreless').click(function(){
	$d = $(this)
	$p = $(this).parents(".text-copy")
	$d.toggleClass('less')

	if ( $(window).width() < 992) {
		//expanding
		if ($d.hasClass('less')) {
			$p.addClass('expanded').find('.main-content-height').height('100%')
			if ( (typeof(contentslider)!='undefined') && (typeof(contentslider.reloadSlider) !='undefined') ){
				contentslider.reloadSlider()
			}
		} else {
			$p.removeClass('expanded').find('.main-content-height').height('350px')
			if ( (typeof(contentslider)!='undefined') && (typeof(contentslider.reloadSlider) !='undefined') ){
				contentslider.reloadSlider()
			}
			window.scrollTo(0, $('.tab-row').position().top - 10);
		}

	} else {

		if ($d.hasClass('less')) {
			// expanding
			tmpH = $p.data('height')
			$p.find('.main-content-height').animate({ 
	      height: tmpH
	    }, 200, function(){
	    	$p.addClass('expanded')
	    	$p.find('.main-content-height').css('height', '100%')
				if ( typeof(contentslider.reloadSlider) !='undefined') {
					contentslider.reloadSlider()
				}
	    });
		} else {
			tmpH = $p.data('heightshort')
			$p.find('.main-content-height').animate({ 
	      height: tmpH
	    }, 200, function(){
	    	$p.removeClass('expanded')
				if ( typeof(contentslider.reloadSlider) !='undefined') {
					contentslider.reloadSlider()
				}
	    });
		}
	}
})

$('.js-trigger').click(function(){
	target = $(this).data('target')
	$(target).slideToggle(100, function(){
		if ( typeof(contentslider.reloadSlider) !='undefined') {
			contentslider.reloadSlider()
		}
	})
})

$('.js-trigger-next').click(function(){
	if ( $(this).hasClass('open') ) {
		$(this).toggleClass('open').next('div').slideToggle(100)
		return;
	}
	$('.js-trigger-next.open').toggleClass('open').next('div').slideToggle(100)
	$(this).toggleClass('open').next('div').slideToggle(100)
})

if ($(".js-dd").length > 0) {
	$('.js-dd').each(function(){
		$d = $(this)
		txt = $d.find('li.on').text()
		$d.prev('.js-place-holder').html(txt)
	})
}

$('.js-dd li').click(function(){
	$d = $(this)
	$p = $d.parents('ul.js-dd');
	$(".js-place-holder").toggleClass('open')
	$p.find('li.on').removeClass('on')
	$d.addClass('on')
	$p.prev('.js-place-holder').html($d.text())
	$p.addClass('selected')
	if($(".js-place-holder").css('display') == 'block') $p.toggle()
})

$(".js-grid-list-filter ul li").click(function(){
	$(this).parents('ul').slideToggle()
})

$(".js-place-holder").click(function(){
	$(this).toggleClass('open')
	$(this).next('ul.js-dd').slideToggle()
})

$("button.navbar-toggle").click(function(){
  $('body').toggleClass('nav-open');
})

/*$(".js-list-filter ul li").click(function(){
	d = $(this).data('filter')
	if (d == 'all') {
		$("table.js-lawyers-grid-list tbody tr").fadeIn(100)
	} else {
		$("table.js-lawyers-grid-list tbody tr").fadeOut(100)
		$("table.js-lawyers-grid-list tbody tr"+d).fadeIn(100)
	}
})*/

$(document).on('click',".js-grid-list:not('.on')", function(){
	$('.js-grid-list').toggleClass('on');
	$(".js-lawyers-grid-list.active").fadeOut('fast', function(){
		$(this).removeClass('active').addClass('tmp')
		$(".js-lawyers-grid-list:not('.tmp')").addClass('active').fadeIn('fast', function(){
			$(".js-lawyers-grid-list.tmp").removeClass('tmp');
			$(".js-grid-list-filter").toggle()
		})
	})
});