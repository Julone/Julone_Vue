<template>
    <div class="face_wrapper">
        <ol>
            <li v-for="face in faceList" :key="face">
                <img :src="publicPath + 'face/' + face " @click="pushFace($event)">
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                faceList:[
                    'cj_56.gif',
                    'cy_56.gif',
                    'gz_56.gif',
                    'hx_56.gif',
                    'lei_56.gif',
                    'sa_56.gif',
                    'bs_56.gif',
                    'bz_56.gif',
                    'cool_56.gif',
                    'fd_56.gif',
                    'han_56.gif',
                    'hax_56.gif',
                    'ka_56.gif',
                    'ng_56.gif',
                    'qd_56.gif',
                    'qiang_56.gif',
                    'sx_56.gif',
                    'shuai_56.gif',
                    'tx_56.gif',
                    'wx_56.gif',
                    'xhnf_56.gif',
                    'y_56.gif',
                    'zj_56.gif',
                    'zm_56.gif',
                ]
            }
        },
        props:{
            target:{
                type:Object,
                required:true
            }
        },
        methods:{
            pushFace(e){
                this.$nextTick(()=>{
                    this.target.innerHTML += `<img src="${e.target.src}">`
                })
            }
        },        
    }
</script>

<style scoped>
.face_wrapper{
    width: auto;
    height: auto;
    background: #ffffff;
    z-index: 7;
    border-radius: 10px;
}

.face_wrapper ol{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    user-select: none;
}
.face_wrapper ol li{
    list-style: none;
    float: left;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 50px;
}
.face_wrapper ol li:hover{
    background:rgba(238, 234, 234, 0.65)
}
.face_wrapper ol li img{
    width: 24px;
    height: 24px;
}
</style>
