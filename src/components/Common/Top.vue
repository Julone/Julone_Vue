<template>
    <div v-show="getTopShow" class="fix">
        <section class="gettop_head">
            <el-tooltip :open-delay="300" popper-class="tooltip_white" effect="light" v-if="$slots.head"
            :content="$slots.head[0].data.attrs.tip" placement="left">
                <div class="app_top_round_button ani6" >
                    <slot name="head"></slot>
                </div>
            </el-tooltip>
            <slot name="head" v-else></slot>
        </section>
        
        <section class="gettop_default">
            <slot name="default">
                <el-tooltip :open-delay="300" popper-class="tooltip_white" effect="light" content="返回顶部" placement="left">
                    <div class="app_top_round_button ani3" @click="getTop"><i class="comIcon">&#xe77d;</i></div>
                </el-tooltip>
            </slot>
        </section>

        <section class="gettop_foot">
            <el-tooltip :open-delay="300" popper-class="tooltip_white" effect="light" v-if="showBottom && $slots.foot"
            :content="$slots.foot[0].data.attrs.tip" placement="left">
            <slot name="foot"></slot>
            </el-tooltip>
            <slot name="foot" v-if="showBottom">
                <el-tooltip :open-delay="300" popper-class="tooltip_white" effect="light" content="滚到底部" placement="left">
                    <div class="app_top_round_button ani1" @click="getBottom"><i class="comIcon">&#xe77e;</i></div>
                </el-tooltip>
            </slot>
        </section>
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
        props: {
            top: {
                type: Number
            },
            always: {
                type: Boolean
            },
            showBottom:{
                type: Boolean
            }
        },
        methods: {
            getBottom() {
                
                $('html,body').stop().animate({
                    scrollTop: document.body.scrollHeight
                }, document.body.scrollHeight / 10, 'linear')
                if ($('.el-scrollbar__wrap').scrollTop() != 0) {
                    $('.el-scrollbar__wrap').animate({
                        scrollTop: document.body.scrollHeight
                    }, document.body.scrollHeight / 10, 'linear')
                }
            },
            getTop() {
                $('html,body').stop().animate({
                    scrollTop: 0
                }, scrollTop / 10, 'linear')
                if ($('.el-scrollbar__wrap').scrollTop() != 0) {
                    $('.el-scrollbar__wrap').animate({
                        scrollTop: 0
                    }, scrollTop / 10, 'linear')
                }
            },
            handleScroll() {
                var top = this.always? 0 : (this.top || 400);
                scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.$store.state.scrollTop = scrollTop;
                if (scrollTop < top) {
                    this.getTopShow = false;
                    this.$emit('getUp')
                } else if (scrollTop >= top) {
                    this.getTopShow = true;
                }
            },
            el_handleScroll() {
                var top = this.always? 0 : (this.top || 400);
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
            console.log(this.$slots);
            window.addEventListener('scroll', this.handleScroll);
            this.$nextTick(() => {
                $(".el-scrollbar__wrap").on('scroll', this.el_handleScroll)
            })
        },
        destroyed() {

            window.removeEventListener('scroll', this.handleScroll)
            $(".el-scrollbar__wrap").off('scroll', this.el_handleScroll)
        }
    }
</script>
<style lang="less" scoped>
    .fix {
        position: fixed;
        right: 1.8rem;
        bottom: 3rem;
        height: auto;
        z-index: 100;
        section{
            transition: all ease .4s;
            transform: scale(1);
            &:hover{
                transform:scale(1.15);
                
            }
        }
    }
   

    .app_top_round_button {
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
        i {
            opacity: .8;
        }
        &:hover{
            &{
                background: #fff;
                transform: translate(0,-10px)
            }
        }
    }
</style>