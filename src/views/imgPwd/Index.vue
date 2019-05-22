<template>
  <div class="img-lock">
    <el-col class="item">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>图案解锁</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="reset($refs.imgpwd1)">重置</el-button>
        </div>
        <img-pwd
          class="img-pwd"
          v-model="pwdValue1"
          values="123456789"
          @change="handleChange"
          @success="handleSuccess"
          :status="status"
          ref="imgpwd1"
        />
        <p class="text">
          当前密码: {{pwdValue1}}
        </p>
        <p class="text">
          密码选项: 123456789
        </p>
      </el-card>
    </el-col>
    <el-col class="item">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>图案解锁(隐藏连接线)</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="reset($refs.imgpwd2)">重置</el-button>
        </div>
        <img-pwd
          class="img-pwd"
          v-model="pwdValue2"
          values="qwe123zxc"
          @change="handleChange"
          @success="handleSuccess"
          :status="status"
          :isHideLine="true"
          ref="imgpwd2"
        />
        <p class="text">
          当前密码: {{pwdValue2}}
        </p>
        <p class="text">
          密码选项: qwe123zxc
        </p>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Vue from "vue";
import imgPwd from "./components/imgLock/Index";
export default {
  name: "img-pwd-lock",
  data() {
    return {
      pwdValue1: "",
      pwdValue2: "",
      status: ''
    };
  },
  methods: {
    reset($ref) {
      this.status = "";
      $ref.reset();
    },
    handleChange(val, newVal) {
      // console.log(`当前值：${val}  最终值：${newVal}`);
    },
    handleSuccess(val) {
      // console.log("输入完成,密码: " + val);
      // this.status = 'disabled'
    }
  },
  components: {
    imgPwd
  }
};
</script>
<style>
  .img-lock .el-card__body{
    padding: 20px 0;
  }
</style>

<style lang="scss" scoped>
.img-lock{
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 1200px) {
    display: block;
  }
}
.img-pwd {
  margin: 0 auto;
}
.item {
  width: 600px;
  margin-bottom: 20px;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  .text{
    text-align: center;
    margin-top: 20px;
  }
}
</style>