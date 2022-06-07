<template>
  <div>
    <el-button type="text" @click="handleDelete"
      >点击打开 Message Box 提示是否删除</el-button
    >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="submitLoading"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CatchError, Confirmation, Validate } from "@/utils/decorator";
@Component
export default class DecoratorTest extends Vue {
  ruleForm = {
    name: "",
  };
  rules = {
    name: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
  };
  submitLoading = false;

  @Confirmation({
    title: "提示",
    message: "此操作将永久删除该文件, 是否继续?",
  })
  handleDelete(instance: any, done: any) {
    setTimeout(() => {
      done();
      setTimeout(() => {
        instance.confirmButtonLoading = false;
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      }, 300);
    }, 2000);
  }

  @CatchError()
  @Validate("ruleForm")
  async submitForm() {
    this.submitLoading = true;
    await this.handleTest();
    this.submitLoading = false;
    this.$message.success("Submit Successfully!");
  }

  async handleTest() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        // reject(false);
      }, 1000);
    });
  }

  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields();
  }
}
</script>

<style>
.demo-ruleForm {
  width: 300px;
  margin: 20px auto;
}
</style>
