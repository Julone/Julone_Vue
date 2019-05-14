import { publicPath } from './base'

export default {
    install(Vue) {
        Vue.directive('j_lazy', {
            bind(el, binding) {
                el.src = binding.modifiers.ani ? publicPath + 'loading.svg' : publicPath + 'imgload.png';
            },
            inserted(el, binding) {
                var temp = new Image();
                temp.src = binding.modifiers.obj ? binding.value.url : binding.value
                temp.onload = function () {
                    el.src = temp.src;
                    el.style.display = 'block';
                    el.onload = function () {
                        if ($(el).height() < $(el).width()) {
                            $(el).css({
                                'width': 'auto',
                                'height': '100%'
                            })
                        } else {
                            $(el).css({
                                'height': 'auto',
                                'width': '100%'
                            })
                        }
                    }
                }
                temp.onerror = function () {
                    el.src = binding.modifiers.obj ? binding.value.error : publicPath + 'img404.png';
                    $(el).css({width:'100%'})
                }

            }
        })
        
    }
}