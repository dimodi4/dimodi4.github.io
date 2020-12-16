$(document).ready(function(){
    $('.carusel_iner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow/chevron_left_solid_980.png"> </button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow/chevron_right_solid_982.png"</button>',
       responsive: [
        {
        breakpoint: 992,
        settings: {
        dots: true,
        arrow: false,
           }
        }
      ] 
    });

   $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
                $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
            })
        });
    };

    toggleSlide('.catalog-item_link');
    toggleSlide('.catalog-item_back');


    /* MODAL */
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal_close').on('click', function() {
        $('.overlay, #consultation, #thanks, #myorder').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#myorder .modal_descr').text($('.catalog-item_subtitle').eq(i).text());
            $('.overlay, #myorder').fadeIn('slow');
        })
    });

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");


    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #myorder').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');



            $('form').trigger('rest');

        });
        return false;


    });


    $(window).scroll(function() {
          if ($(this).scrollTop() > 1600){
              $('.pageup').fadeIn();   
          } else {
              $('pageup').fadeOut();
          }


    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
});


});
