<template>
  <div class="container">
      <div class="ReIDContainer">
    <div class="form-box">
      <el-row>
        <el-form :model="reIDForm" :label-width="formLabelWidth">
          <el-form-item label="输入路径:" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input
                  v-model="reIDForm.inputPath"
                  class="input-with-select"
                  placeholder="选择输出路径"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-folder"
                    type="success"
                    @click="selectPathDir('path1')"
                    ></el-button
                  >
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button @click="show(reIDForm.inputPath)"
                  type="primary">显示</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="输出路径:" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input
                  v-model="reIDForm.outputPath"
                  class="input-with-select"
                  placeholder="选择输出路径"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-folder"
                    type="success"
                    @click="selectPathDir('path2')"
                    ></el-button
                  >
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button @click="show(reIDForm.outputPath)"
                  type="primary">显示</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitProcess">提交</el-button>
            <el-button @click="concelProcess">重置</el-button>
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </el-row>
      </div>
    </div>
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        :show-close="false"
        center
      >
        <span>共计 {{ progress.len }} 张</span>
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="progress.percentage"
        ></el-progress>
      </el-dialog>
  </div>
</template>
<script>
import { selectDocumentPath, showDir } from '@/filesystemOperator'
import { showFullScreenLoading, hideFullScreenLoading } from "@/loading";
export default {
  data() {
    return {
      centerDialogVisible: false,
      reIDForm: {
        inputPath:
          "",
        outputPath:
          "",
      },
      formLabelWidth: "100px",
      progress: {
        len: 0,
        percentage: 0,
      },
    };
  },
  destroyed () {
  },
  methods: {
    selectPathDir(variableName){
        if(variableName=='path1'){
            selectDocumentPath((res)=>{
                this.reIDForm.inputPath=res
            })
        }else if (variableName=='path2'){
            selectDocumentPath((res)=>{
                this.reIDForm.outputPath=res
            })
        }
    },
    show(path){
        showDir(path)
    },
    concelProcess() {
      Object.assign(this.$data, this.$options.data());
    },
    submitProcess() {
      if (this.checkSubmitValue()) {
        // this.$message({
        //   message: "功能未实现",
        //   duration: 800,
        //   type: "info",
        // });
        showFullScreenLoading(".ReIDContainer");
        this.timer = setTimeout(this.mockCompute, 1000);
      }
    },
    checkSubmitValue() {
      if (
        this.reIDForm.inputPath == "" ||
        this.reIDForm.outputPath == ""
      ) {
        this.$message({
          message: "参数缺失",
          duration: 800,
          type: "error",
        });
        return false;
      }
      return true;
    },
    mockCompute() {
      hideFullScreenLoading(".ReIDContainer");
    //   this.dialogVisible = true;
        this.finish()
    },
    finish() {
      this.$alert("运行结束", "通知", {
        confirmButtonText: "确定",
        callback: (action) => {
        // this.concelProcess()
        },
      });
    },

  },
};
</script>