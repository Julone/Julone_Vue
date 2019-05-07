<template>
    <div class="container">
        <el-table :data="stulist" @current-change="show" ref="tb" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="100">
            </el-table-column>
            <el-table-column prop="realname" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="time" label="登录时间" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="password" label="密码" :formatter="formatter2">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {
        setStorage,
        getStorage,
        setTime,
        ping
    } from './../others/methods.js'
    export default {
        data() {
            return {
                stulist: []
            }
        },
        methods: {
            formatter(r) {
                // console.log(arguments)
                return setTime(r.time)
            },
            formatter2(r) {
                // console.log(arguments)
                return '*******'
            },
            show(val) {
                this.$message(val.password)

            }

        },
        watch: {

        },
        mounted() {
            $.ajax({
                type: "get",
                url: "//julone.cf/nav/stulist.php",
                dataType: 'json',
                success: function (response) {
                    this.stulist = response
                }.bind(this)
            });
        },

    }
</script>
<style scoped>
    .container {
        width: 100%;
        margin: 0 auto;
        /* padding: 40px; */
    }
</style>