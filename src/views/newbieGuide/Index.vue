<template>
  <div class="index">
    <el-button type="primary" @click="start">点我开始</el-button>
    <!-- <div class="doc"></div> -->
    <template v-if="isShow">
      <div id="steps-1">
        <el-button type="primary">步骤1</el-button>
      </div>
      <div id="steps-2">
        <el-button type="primary">步骤2</el-button>
      </div>
      <div id="steps-3">
        <el-button type="primary">步骤3</el-button>
      </div>
      <div id="steps-4">
        <el-button type="primary">步骤4</el-button>
      </div>
      <div id="steps-5">
        <el-button type="primary">步骤5</el-button>
      </div>
      <div id="steps-6">
        <el-button type="primary">步骤6</el-button>
      </div>
      <div id="steps-7">
        <el-button type="primary">步骤7</el-button>
      </div>
      <div id="steps-8">
        <el-button type="primary">步骤8</el-button>
      </div>
    </template>
    <el-dialog
      title="README"
      :visible="dialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose">
      <div class="readme">
        <p>新手引导(技术总结)</p>
        <br />
        <p>不知何时就想写一个“新手引导”，好像实现不是很难，技术总结完毕</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NewbieGuide from "./logic";
export default {
  name: "newbie-guide",
  data() {
    return {
      isShow: false,
      dialogVisible: sessionStorage.newbieGuideDialogVisible ? false : true,
    };
  },
  methods: {
    start() {
      this.isShow = true;
      this.$nextTick(() => {
        const instance = this.register();
        instance.start();
      });
    },
    register() {
      const self = this;
      return new NewbieGuide({
        currentStep: 0,
        steps: [
          {
            position: "steps-1",
            title: "第一步",
            placement: "rb",
            description: "一些不可描述的事情"
          },
          {
            position: "steps-3",
            title: "第二步",
            placement: "lb",
            description: "还是一些不可描述的事情"
          },
          {
            position: "steps-5",
            title: "第二步steps-5",
            placement: "rt",
            description: "还是一些不可描述的事情"
          },
          {
            position: "steps-7",
            title: "第二步steps-7",
            placement: "lt",
            description: "还是一些不可描述的事情"
          },
          {
            position: "steps-8",
            title: "第二步steps-8",
            placement: "tc",
            description: "还是一些不可描述的事情"
          },
          {
            position: "steps-4",
            title: "第二步steps-4",
            placement: "rc",
            description: "还是一些不可描述的事情"
          },
          {
            position: "steps-8",
            title: "第二步steps-bc",
            placement: "bc",
            description: "还是一些不可描述的事情"
          },
          {
            position: "steps-6",
            title: "第二步steps-lc",
            placement: "lc",
            description: "还是一些不可描述的事情"
          }
        ],
        finishCallback () {
          self.isShow = false;
        }
      });
    },
    
    handleClose () {
      this.dialogVisible = false;
      sessionStorage.newbieGuideDialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.index > div {
  position: fixed;
  z-index: 10000;
}
#steps-1 {
  left: 0px;
  top: 0px;
}
#steps-2 {
  left: 50%;
  top: 0;
}
#steps-3 {
  right: 0;
  top: 0;
}

#steps-4 {
  left: 0px;
  top: 50%;
}
#steps-5 {
  left: 0;
  bottom: 0;
}

#steps-6 {
  right: 0;
  top: 50%;
}

#steps-7 {
  right: 0;
  bottom: 0;
}
#steps-8 {
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 77.8px;
  height: 40px;
}
</style>
