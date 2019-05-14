<template>
    <div class="header">
        <div class="nav">
            <div class="navlogo">
                <div class="logo"  @click="toggleInfo"></div>
                <span @click="toggleInfo" >
                    <img src="./../../assets/img/logo-text.svg" width="100px" height="55px" alt="LOGO">
                </span>
                
                <el-popover placement="bottom-start" width="250" trigger="manual" v-model="showPop" :visible-arrow="false">
                    <template v-if="showTip">
                        <el-alert :tabindex="index" v-for="(el,index) in queryList" :key="el | cap" @click.native="add(el)" :closable="false">
                            {{el | cap}}
                        </el-alert>
                    </template>
                    <div class="search" slot="reference" @click.stop>
                        <i class="comIcon" @click="search" style="opacity:.6">&#xe77a;</i>
                        <input type="text" id="sinput" style="color:gray;width:180px" @keyup.down="fu" placeholder="百度一下,你就知道" v-model.trim="currentText"
                            @keyup.exact="ajax($event.target.value)" @keyup.enter="search">
                    </div>
                </el-popover>
            </div>

            <ul class="menu">
                <router-link tag="div" to="/">
                    <li><i class="comIcon">&#xe71c;</i>首页</li>
                </router-link>
                <router-link tag="div" to="/comment">
                    <li><i class="comIcon">&#xe720;</i>留言</li>
                </router-link>
                  <router-link tag="div" to="/links">
                    <li disabled><i class="comIcon">&#xe715;</i>链接</li>
                </router-link>
                  <router-link tag="div" to="/about">
                    <li><i class="comIcon">&#xe709;</i>关于</li>
                </router-link>
                 <router-link tag="div" to="/user">
                    <li><i class="comIcon">&#xe6e6;</i>账号</li>
                </router-link>
                <router-link tag="div" to="/more">
                    <li ><i class="comIcon">&#xe752;</i>更多</li>
                </router-link>
                <li @click="showMenu"><i class="comIcon">&#xe72d;</i>菜单</li>
            </ul>

        </div>
        <INFO position="left"></INFO>
    </div>
</template>

<script>
    import INFO from '../Info'
    import IndexAni from './../../others/canvas.js'
    import { Sound } from '../../others/methods';
    export default {

        components: {
            INFO
        },
        filters: {
            cap: function (value,b) {
                if (!value) return ''
                value = value.toString()
                // return value.charAt(0).toUpperCase() + value.slice(1)
                return value
            }
        },
        data() {
            return {
                queryList: [],
                currentText: '',
                showTip:true
            }
        },
        mounted(){
            $(".nav .menu li").mouseenter(function () { 
                Sound('click')
            });
            $('.search input').focus(function (e) { 
                Sound('ding')
            });
            $("#sinput").blur(()=>{
                setTimeout(()=>{
                    this.showTip = false
                },150)
            })
         
        },
        computed: {
            infoState() {
                return this.$store.state.infoState
            },
            showPop() {
                return this.queryList.length == 0 ? false : true && this.showTip
            }
        },
        methods: {
            add(a) {
                this.currentText = a;
                this.search();
            },
            showMenu(ev) {
                this.$store.commit('toggleMenu', true);
            },
            toggleInfo() {
                if (!this.infoState) {
                    this.$store.commit('toggleInfo', true);
                } else {
                    this.$store.commit('toggleInfo', false)
                }
            },
            search() {
                window.open("https://www.baidu.com/s?wd=" + this.currentText + "&ie=UTF-8");
                $("#sinput").focus()
            },
            ajax(a) {
                this.showTip =  true
                $.ajax({
                    type: "GET",
                    url: "https://gsp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                    data: {
                        sc: 'hao123',
                        _: +new Date,
                        wd: a
                    },
                    jsonp: 'cb',
                    dataType: "jsonp",
                    success: function (response) {
                        this.queryList = [].slice.call(response.s,0,6);
                    }.bind(this)
                })

            }
        },
    }
</script>

<style scoped>
    .el-alert{
        background: transparent;
         border-radius: 0;
        border-bottom: 1px solid #ebeef5;
        cursor: pointer;
    }
    .el-alert:nth-child(6){
       border-bottom: none
    }
   

    .el-alert:hover {
        background: #f4f4f5
    }

    .el-alert::selection {
        background: transparent
    }

    .search {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 10px 0 10px;
        border: 1px solid #e3e3e3;
        color: #2c3e50;
        outline: none;
        border-radius: 15px;
        transition: border-color 0.2s ease;
        vertical-align: middle !important;
        margin-left: .3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        max-width: 200px;
    }

    .search input {
        border: none;
        font-size: .8rem;
            height: inherit;
    background: transparent;
        transition: all ease .4s;
    }

    .search input::placeholder {
        font-size: .8rem;
        letter-spacing: 1px;
        transition: all ease .4s
    }
    .search input:focus{
        transform: translate(-1rem,0)
    }
    .search input:focus::placeholder{
        opacity: 0;
        /* transform: translate(60px,0) */
    }
    .search:focus-within{
        border-color: #39b2fb
    }
    .search i{
        transition: all ease .5s;
        z-index: 10;
    }
    .search:focus-within i{
        transform: translate(750%,0)
    }

    .header {
        position: fixed;
        width: 100%;
        height: 55px;
        z-index: 2009;
        top: 0;
        left: 0;
        background: white;
        box-shadow: 0 20px 40px -20px rgba(0, 26, 100, .2);
        border-bottom: 1px solid #cfd9e4;
        color: gray
    }

    .nav {
        display: flex;
        width: 100%;
        height: inherit;
        margin: 0 auto;
        justify-content: space-between;
        opacity: 1;
    }

    .navlogo {
        width: auto;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 1rem;
        cursor: pointer;
        margin-right: .5rem
    }

    .logo::before {
        font-size: 2rem;
        position: absolute;
        opacity: 0;
        top: 0;
    }

    .navlogo span:nth-of-type(1) {
        margin:0 10px;
        display: flex;
        height: 55px;   
    }

    .navlogo img:hover{
        filter:brightness(1.1);
    }
    .navlogo span::selection{
        background: transparent
    }

    .menu {
        width: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        height: 55px;
    }
    .menu li i::selection{
        background: none
    }

    .menu li {
        cursor: pointer;
        line-height: 55px;
        padding: 0 15px;
        position: relative;
        white-space: nowrap;
        color:#8596a9;
        font-size: .9rem;
    }

    .menu li i {
        vertical-align: top;
        letter-spacing: 1px;
        font-size: 1.3rem
    }

    .menu li::selection {
        background: transparent
    }
 
    .router-link-exact-active {
        color: #0f9aed !important;
        position: relative;
        /* box-shadow: inset 0px 7px 0 -4px rgb(57, 178, 251), 0 0 2px rgba(0, 0, 0, .1) */
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);

    }
    .router-link-exact-active li{
        color: rgb(140, 148, 168) !important;

    }
    .router-link-exact-active::before{
        content: '';
        width: 100%;
        height: 3px;
        background: rgb(140, 148, 168);
        position: absolute;
        animation: rotateY 1s cubic-bezier(.73,2.57,.62,.29) 1;
        border-radius: 100px;
    }
    @keyframes rotateY {
        from{
            opacity: 0;
            transform: rotateY(90deg);
        }
        to{
            opacity: 1;
            transform: rotateY(0deg)
        }
    }
    

     @media screen and (max-width: 1100px){
        .menu li{
            font-size: .85rem;
        } 
     }

    
    @media screen and (max-width: 800px){
        .menu li{
            font-size: 0;
        }
        .menu li i{
            font-size: 1.3rem
        }
      
        .search{
            display: none;
            /* transform: scale(.6) */
        }
        
    }
    @media screen and (max-width: 450px) {
        .menu li:not(:nth-child(6)){
            display: none;
        }
        .menu li:last-child i{
            font-size: 1.5rem
        }
    }
</style>