<template>
    <div class="list">
        <div class="list_wrapper" v-for="item in comList" :key="item">
            <div class="list_item">
                

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                comList: []
            }
        },
        props: {
            name: {
                type: String
            },
            userId: {
                type: String
            }
        },
        methods: {
            load() {
                axios({
                    method: 'post',
                    url: this.$store.state.getUserCom,
                    data: {
                        userId: this.userId
                    }
                }).then(res => {
                    this.comList.push(...res.data)
                })
            }
        },
        watch: {

        },

    }
</script>
<style scoped>

</style>