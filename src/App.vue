<template>
	<div id="app">
		<template >
			<my-header v-if="isMobile"></my-header>
			<pc-header v-if="!isMobile"></pc-header>
		</template>
		<my-menu></my-menu>
		<my-MarginTop></my-MarginTop>
		<transition name="fadeApp">
			<router-view />
		</transition>
		<transition name="fadeApp">
			<div class="shadow" v-show="showShadow"></div>
		</transition>
    <canvas id="bottom-canvas" v-if="$route.path!='/comment'" :width="viewWidth" :style="{'margin-left': - (parseFloat(viewWidth) / 2) + 'px' ,'opacity' : .9}"></canvas>
	</div>
</template>

<script>
	import IndexAni from './others/canvas.js'
	import myHeader from './components/Mobile/Header.vue'
	import {mobile} from './others/methods'
	import menu from './components/Menu'
	import pcheader from './components/Desktop/Header.vue'
	Vue.use(VueAwesomeSwiper)
	export default {
		computed:{
			viewWidth(){
				return this.$store.state.innerWidth + 'px'
			},
			isMobile(){
				return this.$store.state.isMobile;
			},
			showShadow(){
				return this.$store.state.menuState
			}
		},
		components: {
			"myHeader": myHeader,
			'myMenu': menu,
			'pcHeader':pcheader,
			'myMarginTop': {
				template: `<div class="sound_wrapper"></div>`
			}
		},
		beforeCreate(){
			this.$store.dispatch('appStart');
		},
		mounted(){
			console.log(' _(:3」∠)_ 一枚小白，大神不要黑 ...o(╥﹏╥)o...');
			IndexAni.init('bottom-canvas', {
				r: 233,
				g: 233,
				b: 233,
				amount: 30,
				from: 150,
				to: 0,
				moveDur: 30,
				newDur: this.isMobile? 200: 50
			});

			$(window).resize(function () { 
				this.$store.dispatch('appStart');
			}.bind(this));
		}
	}

</script>

<style lang="less">
@import url('./assets/app.css');
.generate-columns(10);
.generate-columns(@n, @i: 1) when (@i =< @n) {
  .ani@{i} {
	opacity: 0;
	animation: fadein 1s ease 1;
	animation-fill-mode: forwards;
	animation-delay: (@i * 0.1s);
  }
  .generate-columns(@n, (@i + 1));
}
.fromBottom-enter-active {
  transition: transform 1s ease;
}
.fromBottom-leave-active {
  transition: transform .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fromBottom-enter, .fromBottom-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(40px);
}
.grid::before{
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background-attachment: initial;
    background-image: url(./assets/img/grid.png)
  }
#bottom-canvas{
    position: absolute;
    bottom: 0;
    left: 50%;
    pointer-events: none
}
.shadow{
	position: fixed;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	left: 0;
	top: 0;
	z-index: 2400;
}


</style>