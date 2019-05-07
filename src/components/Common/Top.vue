<template>
    <div v-show="getTopShow" class="fix">
        <slot name="head"></slot>
          <el-tooltip popper-class="tooltip_white" effect="light" :offset="0" content="返回顶部" placement="left">
        <div class="roundButton ani1" @click="getTop"><i class="comIcon">&#xe77d;</i></div>
    </el-tooltip>

        <slot name="foot"></slot>
    </div>
</template>
<script>
    import {
        debounce
    } from './../../others/methods.js'
    var scrollTop = 0;
    export default {
        data() {
            return {
                getTopShow: false
            }
        },
        props:{
            top:{
                type:Number
            }
        },
        methods: {
            getTop() {
                
                $('html,body').animate({
                    scrollTop: 0
                }, scrollTop / 10, 'linear')
                if($('.el-scrollbar__wrap').scrollTop() != 0){
                     $('.el-scrollbar__wrap').animate({
                        scrollTop: 0
                    }, scrollTop / 10, 'linear')
                }
            },
            handleScroll() {
                var top=this.top || 400;
                scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.$store.state.scrollTop = scrollTop;
                if (scrollTop < top) {
                    this.getTopShow = false;
                    this.$emit('getUp')
                } else if (scrollTop >= top) {
                    this.getTopShow = true;
                }
            },
            el_handleScroll(){
                var top=this.top || 400;
                scrollTop = $('.el-scrollbar__wrap').scrollTop();
                this.$store.state.scrollTop = scrollTop;
                if (scrollTop < top) {
                    this.getTopShow = false;
                    this.$emit('getUp')
                } else if (scrollTop >= top) {
                    this.getTopShow = true;
                }
            }

        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
            this.$nextTick(()=>{
                $(".el-scrollbar__wrap").on('scroll',this.el_handleScroll)
            })

        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
            $(".el-scrollbar__wrap").off('scroll',this.el_handleScroll)
        }
    }
</script>
<style>
    .tooltip_white{
        border-color: gray !important;
    }
    .tooltip_white .popper__arrow{
        border-color: gray !important;

    }



    .roundButton {
        width: 2.7rem;
        height: 2.7rem;
        background: rgb(253, 253, 253);
        box-shadow: -1px 9px 22px -7px rgba(43, 43, 43, 0.45);
        border-radius: 50px;
        border: 1px solid rgba(177, 177, 177, 0.57);
        overflow: hidden;
        z-index: 2423;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 16px 0;
        cursor: pointer;

    }

    .roundButton i {
        opacity: .8;
    }
</style>

<style scoped>
    .fix {
        position: fixed;
        right: 1.8rem;
        bottom: 3rem;
        height: auto;
        
    z-index: 100;

    }
</style>