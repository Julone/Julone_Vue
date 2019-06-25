<template>
	<div id="app">
		<template>
			<my-header v-if="isMobile"></my-header>
			<pc-header v-if="!isMobile"></pc-header>
		</template>
		<my-menu></my-menu>
		<my-MarginTop></my-MarginTop>
		<div class="container-view">
			<transition name="fadeApp">
				<router-view />
			</transition>
		</div>
		<transition name="fadeApp">
			<div class="shadow" v-if="showShadow"></div>
		</transition>
		<canvas id="bottom-canvas" :width="viewWidth"
			:style="{'margin-left': - (parseFloat(viewWidth) / 2) + 'px' ,'opacity' : .9}"></canvas>
	</div>
</template>

<script>
	import IndexAni from './others/canvas.js'
	import myHeader from './components/Mobile/Header.vue'
	import {
		mobile
	} from './others/methods'
	import menu from './components/Menu'
	import pcheader from './components/Desktop/Header.vue'

	export default {
		computed: {
			viewWidth() {
				return this.$store.state.innerWidth + 'px'
			},
			isMobile() {
				return this.$store.state.isMobile;
			},
			showShadow() {
				return this.$store.state.menuState
			}
		},
		components: {
			"myHeader": myHeader,
			'myMenu': menu,
			'pcHeader': pcheader,
			'myMarginTop': {
				template: `<div class="sound_wrapper"></div>`
			}
		},
		beforeCreate() {
			this.$store.dispatch('appStart');
		},
		mounted() {
			console.warn('%c_(:3」∠)_ 一枚小白，大神不要黑 ...o(╥﹏╥)o...', `color:#d6aa26;font-size:.8rem;font-family:微软雅黑`);
			$(window).resize(function () {
				this.$store.dispatch('appStart');
			}.bind(this));

			IndexAni.init('bottom-canvas', {
				r: 233,
				g: 233,
				b: 233,
				amount: 30,
				from: 150,
				to: 0,
				moveDur: 30,
				newDur: this.isMobile ? 200 : 50
			})
		},
	}
</script>

<style lang="less">
	@import url('./assets/app');
</style>