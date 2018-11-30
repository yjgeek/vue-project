<template>
    <div class="footer">
        <p class="statement">声明: 本项目里面的所有数据，均是本人结合互联网数据然后意想出来的，数据绝逼是假的，大家关注技术就好(*/ω＼*)</p>
        <p class="link">
            <a target="_blank" href="https://github.com/yuanjie007/vue-project">GitHub项目</a>
            <a target="_blank" href="http://www.yjgeek.com">我的博客</a>
        </p>
        <p>粤ICP备18024016号-1</p>
    </div>
</template>

<script>
export default {
  name: 'c-footer',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
    .footer{
        background: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        a{
            color: #fff;
            text-decoration: underline;
            margin-right: 15px;
            transition: color .4s;
            &:hover{
                color: #f54228;
            }
        }
        .link{
            margin: 8px 0;
            font-size: 16px;
        }
    }
</style>
