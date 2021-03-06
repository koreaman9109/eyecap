jQuery(document).ready(function($){			
	
	/* Swiper02 */
	$(".swiper-container").each(function(index, element){
        var $this = $(this);
        $this.addClass('instance-' + index);

        var swiper = new Swiper('.instance-0', {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
             
    			var swiper02 = new Swiper('.instance-1', {
    				slidesPerView: "9",
    				spaceBetween: 30,
    				
//    				slidesPerGroup: "9",
    				loop: true,
    				loopFillGroupWithBlank: true,
    				navigation: {
    					nextEl: '.swiper-button-next',
    					prevEl: '.swiper-button-prev',
    				},
    				breakpoints : {// 반응형		
    					1199 : { // pc
    						slidesPerView : 8
    					},		
    					1023 : {  // 모바일
    						slidesPerView : 7	
    					},
    					779 : {  // 모바일
    						slidesPerView : 6	
    					},
    					754 : {  // 모바일
    						slidesPerView : 5	
    					},
    					479 : {  // 모바일
    						slidesPerView : 3	
    					},
    					292 : {  // 모바일
    						slidesPerView : 2	
    					},
    					188 : {  // 모바일
    						slidesPerView : 1	
    					}
    				},
    			});                    
    		});

	
	
	/* scrollMain */
	$(window).on("scroll", function() {

        var scrollTop = $(this).scrollTop();

        var st1 = $("#section-1").outerHeight();
        var st2 = st1 + $("#section-2").outerHeight();
        var st3 = st2 + $("#section-3").outerHeight();
        var st4 = st3 + $("#section-4").outerHeight();
        var st5 = st4 + $("#section-5").outerHeight();
            
        if (scrollTop < st1) {
            $(".gnb a").removeClass("on");
            $(".gnb a").eq(0).addClass("on");
        }

        if (scrollTop > st1 && scrollTop < st2) {
            $(".gnb a").removeClass("on");
            $(".gnb a").eq(1).addClass("on");
        }

        if (scrollTop > st2 && scrollTop < st3) {
            $(".gnb a").removeClass("on");
            $(".gnb a").eq(2).addClass("on");
        }

        if (scrollTop > st3 && scrollTop < st4) {
            $(".gnb a").removeClass("on");
            $(".gnb a").eq(3).addClass("on");
        }

        if (scrollTop > st4) {
            $(".gnb a").removeClass("on");
            $(".gnb a").eq(4).addClass("on");
        }

    });

    function checkMobileDevice() {
        var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
        for (var info in mobileKeyWords) {
            if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
                return true;
            }
        }
        return false;
    }

    jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");
        return this;
    };

    $(".lnk-moving").on("click", function(e) {
        e.preventDefault();

        // $(".lnk-moving").removeClass("on");
        // $(this).addClass("on");

        var scrollTop = $("#" + $(this).attr("data-url")).offset().top - 100;
        $("body, html").animate({
            scrollTop: scrollTop
        }, 400);
    });

    $(".lnk-realtime").on("click", function(e) {
        e.preventDefault();
        if (checkMobileDevice()) {
            $(".lnk-realtime-tel").get(0).click();
        } else {
            $(".modal-content").removeClass("on");
            if ($(".modal").hasClass("on")) {
                $(".modal").removeClass("on");
            } else {
                $(".modal").addClass("on");
                $(".modal-content.tell-info").addClass("on");
            }
            // $(".modal-content.tell-info").center();
        }
    });

    $(".btn-terms-detail").on("click", function(e) {
        e.preventDefault();
        $(".modal-content").removeClass("on");
        if ($(".modal").hasClass("on")) {
            $(".modal").removeClass("on");
        } else {
            $(".modal").addClass("on");
            $(".modal-content.terms").addClass("on");
        }
        // $(".modal-content.terms").center();
    });

    $(".modal-content").on("click", function(e) {
        e.stopPropagation();
    });

    $(".btn-modal-close").on("click", function(e) {
        e.stopPropagation();
        if ($(".modal").hasClass("on")) {
            $(".modal").removeClass("on");
        } else {
            $(".modal").addClass("on");
        }
    });

    $(".modal").on("click", function(e) {
        e.stopPropagation();
        if ($(".modal").hasClass("on")) {
            $(".modal").removeClass("on");
        } else {
            $(".modal").addClass("on");
        }
    });
    
    
    // Accordian
    $(function(){
    	$(document).on("click", "#accordian h4", function(e) {
        /*$("#accordian h4").click(function(){*/
            $("#accordian ul ul").slideUp();
            $('.ico_ar').text('+');
            //$('.ico_ar').css('transform','none');
            if(!$(this).next().is(":visible"))
            {
                $(this).next().slideDown();
                $(this).find('.ico_ar').text('-');
                //$(this).find('.ico_ar:eq(0)').css('transform','rotate(180deg)');
            }
        })
    });
});

/*관리자 팝업창*/

function Close02 () {
	document.getElementById("pop_master02").classList.remove('show');
};

function popAcWrite(seq) {
	$.ajax({ 
		type: 'post' , 
		url: '/archaveWriteForm.do',
		cache : false,
		dataType : 'html' ,
		success: function(data) {
			$('#pop_master02').empty();
			$('#pop_master02').html(data);
			var popup2 = document.getElementById("pop_master02");
			popup2.classList.add("show");
		} 
	});	
};

function popAcModify(seq) {
	$.ajax({ 
		type: 'post' , 
		url: '/archaveModifyForm.do?board_seq='+seq ,
		cache : false,
		dataType : 'html' ,
		success: function(data) {
			$('#pop_master02').empty();
			$('#pop_master02').html(data);
			var popup2 = document.getElementById("pop_master02");
			popup2.classList.add("show");
		} 
	});	
};

function Close () {
	document.getElementById("pop_master").classList.remove('show');
};

function popFnQWrite() {
	$.ajax({ 
		type: 'post' , 
		url: '/fnqWriteForm.do',
		cache : false,
		dataType : 'html' ,
		success: function(data) {
			$('#pop_master').html(data);
			var popup = document.getElementById("pop_master");
			popup.classList.add("show");
			
		} 
	});	
};

function popFnQModify(seq) {
	$.ajax({ 
		type: 'post' , 
		url: '/fnqModifyForm.do?board_seq='+seq,
		cache : false,
		dataType : 'html' ,
		success: function(data) {
			$('#pop_master').html(data);
			var popup = document.getElementById("pop_master");
			popup.classList.add("show");
		} 
	});	
};

