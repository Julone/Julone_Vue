<template>
    <div class="footer" :class=" btm ? 'btm' : ''" :style="{'bottom': btm? btm :''}">
        <div class="default" v-if="!beiAn">
            <p>Copyright &copy; 1997-2019 JULONE </p>
            <p>遵循<router-link :to="{path:'/copyright'}">用户协议</router-link>与<router-link :to="{path:'/copyright',query:{mode:'privacy'}}">隐私政策</router-link></p>
        </div>
        <div class="beian" v-else>
            <p>Copyright &copy; 1997-2019 JULONE </p>
            <p><img src="./../assets/img/police.png" alt="">&nbsp;闽ICP证030673号</p>
        </div>

        
    </div>
</template>

<script>
    
    export default {
        props:{
            btm:{
                type:String
            },
            beiAn:{
                type:Boolean
            }
        }

    }
</script>

<style>
    .footer {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        color: #7f879c;
        display: table;
        font-size: 0.8rem;
        margin-top: 1.5rem;
        max-width: 320px;
        height: 50px;
        z-index: 1000;
    }

    .footer:before,
    .footer:after {
        content: "";
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
        border-top: 1px solid #e8eaec;
        transform: translateY(0);
    }

    .footer a {
        color: #76a0cd;
        margin: 0 5px;
    }
    .footer a:hover{
        text-decoration: underline
    }

    .footer p {
        margin: 4px 0;
        display: inline-block;
        white-space: nowrap;
    }
    .btm{
        position: absolute;
        bottom: 5rem;
        left: 50%;
        margin-left: -160px;
    }
    .beian p img{
        vertical-align: text-bottom
    }
</style>