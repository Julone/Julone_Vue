import * as _methods from "./methods";

$(function () {
    $(document).on('click', '.post_img div', function (event) {
        $(".header").css('filter','blur(5px)')
        _methods.blur(true,true);
        var index = $(this).index();
        var imgs = Array.from($(this).parent().find('img')).slice(',');
        var outputs = "";
        for (var i = 0; i < imgs.length; i++) {
            let temp
            if (imgs[i].src.indexOf("gif") != -1) {
                temp = imgs[i].src.replace('sm_','').replace(/.webp/g, "");
            } else {
                temp = imgs[i].src.replace('sm_','');
            }
            outputs += `<div class="swiper-slide" style="padding:0 2%">
                            <div class="swiper-zoom-container">
                                <img data-src='${temp}' src="${temp.replace('upload/','upload/sm_')}" class="swiper-lazy">
                                <span class="swiper-lazy-preloader" style="pointer-events:none"></span>
                            </div>
                        </div>`
        }
        $('#com_list_lunbo').remove();
        $('.comment').append($(`<div class="swiper-container" noblur id="com_list_lunbo">
                                    <div class="swiper-wrapper">${outputs}</div>
                                    <div class="swiper-pagination_MAIN" style="z-index:10000;position: fixed; text-align: center;"></div>
                                    <div class="swiper-tool">
                                        <button class="big ani2"><i class="el-icon-zoom-in"/></button>
                                        <button class="close ani4"><i class="el-icon-close"/></button>
                                        <button class="small ani6"><i class="el-icon-zoom-out"/></button>
                                    </div>
                                </div>`));
        $(".comment").css('overflow-y', 'hidden');
        var mySwiper = new Swiper('#com_list_lunbo', {
            zoom: {
                maxRatio: 2,
            },
            mousewheel: true,
            spaceBetween: 20,
            passiveListeners: false,
            pagination: {
                el: '.swiper-pagination_MAIN',
                bulletClass: 'my-bullet',
                bulletActiveClass: 'my-active-bullet',
                clickable: true,
            },
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
            },
            on: {
                init: function () {
                    if ($("#com_list_lunbo .swiper-slide").length <= 1) {
                        $("#com_list_lunbo .swiper-pagination").hide();
                    }
                },
                click: function (e) {
                    e.stopPropagation()
                   
                    // if (mySwiper.zoom.scale == 1) {
                    //     _methods.blur(false);
                    //     $(".header").css('filter','blur(0px)')
                    //     $("body").css('overflow-y', 'auto');
                    //     _methods.Sound('hover');
                    //     $('.swiper-container').css({
                    //         'transform': 'scale(0)',
                    //         'opacity': '0'
                    //     });
                    // }
                },
                slideChange: function () {
                    _methods.Sound('ding');
                }
            }
        })
        $(".swiper-tool .big").click(function(){
            mySwiper.zoom.in();
        })
        $(".swiper-tool .small").click(function(){
            mySwiper.zoom.out();
        })
        $('.swiper-tool .close').click(function(){
                $('.swiper-tool').hide(0)
                 _methods.blur(false,true);
                $(".header").css('filter','blur(0px)')
                $("body").css('overflow-y', 'auto');
                _methods.Sound('hover');
                $('#com_list_lunbo').css({
                    'transform': 'scale(0)',
                    'opacity': '0'
                });
        })

        mySwiper.slideTo(index, 0, false);
        _methods.pushHistory(function () {
            _methods.blur(false,true);
            $(".header").css('filter','blur(0px)')
            $("body").css('overflow-y', 'auto');
            _methods.Sound('hover');
            $('#com_list_lunbo').css({
                'transform': 'scale(0)',
                'opacity': '0'
            });
        })
    })
    $(document).on('click','.com_item',function(){
        _methods.Sound('hover')
    })
    $(document).on('click','#com_submit,#reply_submit',function(){
        _methods.Sound('heavy')
    })
     $(document).on('click','.com_file,#com_face',function(){
        _methods.Sound('open')
    })
})

