<template>
<div v-if="status === 4 || status === 5">
  <el-form :model="form" ref="form" label-width="80px" :rules="rules" v-bind="$config.defaultFormLayout">
    <el-form-item label="售后原因" prop="exit_description">
      <el-input :readonly="status === 4 ? false : true" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.exit_description" label="请输入售后原因"></el-input>
    </el-form-item>
    <template v-if="status === 5">
      <el-form-item label="售后处理" prop="return_processing_advice">
        <el-select placeholder="请选择处理状态" v-model="form.return_processing_advice">
          <el-option value="">请选择处理状态</el-option>
          <el-option value="退货">退货</el-option>
          <el-option value="换货">换货</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理原因" prop="return_processing">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.return_processing" label="请输入处理原因"></el-input>
      </el-form-item>
    </template>
  </el-form>
  <div style="text-align: center">
    <el-button type="danger" @click="$router.push({name: 'shopOrder'})">取消</el-button>
    <el-button type="primary" @click="submit(status)">提交</el-button>
  </div>
</div>
<div v-else class="product-info">
  <p><strong>申请原因: </strong>{{params.exit_description}}</p>
  <p><strong>处理状态: </strong>{{params.return_processing_advice}}</p>
  <p><strong>处理原因: </strong>{{params.return_processing}}</p>
</div>
</template>

<script>
export default {
  name: 'shop-after-order',
  props: {
    status: {
      type: Number,
      default () {
        return 0
      }
    },
    id: Number,
    params: {}
  },
  data () {
    return {
      form: {
        exit_description: this.params.exit_description,
        return_processing: '',
        return_processing_advice: ''
      },
      rules: {
        exit_description: [{ required: true, message: '退货原因不能为空!' }]
      }
    }
  },
  methods: {
    submit (status) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', {...this.form, id: this.id, status: ++status})
        } else {
          this.$message.error('数据有误，请重新检查')
        }
      })
    }
  }
}
</script>
