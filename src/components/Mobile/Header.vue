<template>
    <div class="header">
        <div class="nav">
            <div class="navLeft" :class="{aniLeft : canAni}" @click="openMenu">
                <div class="menu-logo"></div>
            </div>
            <div class="navCenter" :class="{aniCenter:canAni}" @click="toggleInfo">
                <div :class="{navList:true,navCenterShow:infoState}">
                    <div class="navListUp logotext"><img src="./../../assets/img/logo-text.svg" width="100px" alt=""></div>
                    <div class="navListDown">INFO</div>
                </div>
            </div>
            <router-link to="comment">
                <div class="navRight" :class="{aniRight:canAni}" @click="ani()">
                    <!-- <img src="./../../assets/img/write.png" height="26" width="26" alt=""> -->
                    <i class="comIcon"> {{isComment? '&#xe6ec;':'&#xe6eb;'}}</i>
                </div>
            </router-link>
        </div>
        <INFO></INFO>
    </div>
</template>

<script>
    import INFO from './../Info'
    export default {
        name: 'myHeader',
        components: {
            INFO
        },
        data() {
            return {
                canAni: false
            }
        },
        computed: {
            infoState() {
                return this.$store.state.infoState
            },
            isComment(){
                return this.$route.name === 'comment';
            }
        },
        methods: {
            openMenu() {
                this.$store.commit('toggleMenu', true)
            },
            toggleInfo() {
                if (!this.infoState) {
                    this.$store.commit('toggleInfo', true);
                } else {
                    this.$store.commit('toggleInfo', false)
                }
            },
            ani() {
                this.canAni = false;
                setTimeout(() => {
                    this.canAni = true
                }, 100)
            }
        },
        mounted() {
            this.ani();
        }
    }
</script>

<style scoped>
    i.comIcon{
        color: gray;
        font-size: 1.8rem
    }
    .header {
        position: fixed;
        width: 100%;
        height: 55px;
        z-index: 2222;
        top: 0;
        left: 0;
    }
    .menu-logo {
        transform: scale(0.6);
        top: 17px;
        left: 12px;
    }

    .menu-logo,
    .menu-logo::after,
    .menu-logo::before {
        position: absolute;
        background: #7a7878;
        cursor: pointer;
        border-radius: 10px;
        width: 35px;
        height: 5px;
    }

    .menu-logo::before {
        content: '';
        top: 13px;
    }

    .menu-logo::after {
        content: '';
        top: 26px;
    }

    .nav {
        display: flex;
        width: inherit;
        height: inherit;
        justify-content: space-between;
        background: white;
        box-shadow: 0 20px 40px -20px rgba(0, 26, 100, .2);
        border-bottom: 1px solid #cfd9e4;
        opacity: 1;
    }

    .navLeft,
    .navRight {
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: .8;
    }

    .aniLeft {
        animation: aniLeft 1s cubic-bezier(.73, 2.57, .62, .29) 1;
        animation-delay: .2s;
    }

    @keyframes aniLeft {
        from {
            transform: scale(.4) translate3d(-50px, 0, 0);
            opacity: 0;
        }

        to {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: .8
        }
    }

    .aniRight {
        animation: aniRight 1s cubic-bezier(.73, 2.57, .62, .29) 1;
        animation-delay: .4s
    }

    .navRight:hover {
        opacity: 1;
    }

    @keyframes aniRight {
        from {
            transform: scale(.4) translate3d(50px, 0, 0);
            opacity: 0;
        }

        to {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: .8
        }
    }

    .nav .navCenter {
        text-transform: uppercase;
        line-height: 55px;
        font-weight: 600;
        opacity: .5;
        width: 140px;
        height: 55px;
        text-align: center;
        display: block;
        overflow: hidden;
        font-size: 22px
    }

    .aniCenter {
        animation: aniCenter 1s cubic-bezier(.73, 2.57, .62, .29) 1;
    }

    @keyframes aniCenter {
        from {
            transform: scale(.4) translate(0, -50px);
        }

        to {
            transform: scale(1) translate(0, 0);
        }
    }

    .navList {
        display: flex;
        width: 140px !important;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: all cubic-bezier(.73, 2.57, .62, .29) 1s;
    }

    .navListUp,
    .navListDown {
        width: 140px !important;
        height: 55px !important;
        line-height: 55px !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: brightness(.2);
        font-weight: 700;
        color: #889398;
        letter-spacing: 2px;
        /* padding: 0 1.9rem; */
    }

    .navCenterShow {
        transform: translate(0, -55px);
    }

    .nav div:nth-child(3) {
        justify-content: center;
        transition: all ease 1s;
    }
</style>