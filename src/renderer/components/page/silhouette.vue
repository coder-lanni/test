<template>
  <div class="container">
    <div class="form-box">
      <el-row>
        <el-form :model="silhouetteForm" :label-width="formLabelWidth">
          <el-form-item label="原始图序列:" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input
                  v-model="silhouetteForm.inputPath"
                  class="input-with-select"
                  placeholder="选择原始图序列目录"
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
                <el-button @click="show(silhouetteForm.inputPath)"
                  type="primary">显示</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="剪影输出路径:" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input
                  v-model="silhouetteForm.outputPath"
                  class="input-with-select"
                  placeholder="选择剪影输出目录"
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
                <el-button @click="show(silhouetteForm.outputPath)"
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
        <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="concelProcess">关 闭</el-button>
      </span> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { selectDocumentPath, showDir } from '@/filesystemOperator'
export default {
  data() {
    return {
      centerDialogVisible: false,
      silhouetteForm: {
        inputPath:
          "",
        outputPath:
          "",
      },
      formLabelWidth: "110px",
      progress: {
        len: 0,
        percentage: 0,
      },
    };
  },
  destroyed () {
      this.$WebSocket.websocketclose()
  },
  methods: {
    selectPathDir(variableName){
        if(variableName=='path1'){
            selectDocumentPath((res)=>{
                this.silhouetteForm.inputPath=res
            })
        }else if (variableName=='path2'){
            selectDocumentPath((res)=>{
                this.silhouetteForm.outputPath=res
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
      if (!this.$WebSocket.websocket) {
        this.$WebSocket.WebSocketFn(() => {
          this.submitSend();
        });
      } else {
        this.submitSend();
      }
    },
    submitSend() {
      this.$WebSocket.send(
        {
          serviceName: "genSilhouette",
          data: this.silhouetteForm,
        },
        false
      );
      this.centerDialogVisible = true;
      this.$WebSocket.onmessage(this.receiveDataProcess);
    },
    receiveDataProcess(res) {
      var index = -1;
      if (res.flag == "header") {
        this.progress.len = res.data.len;
      } else if (res.flag == "content") {
        index = res.data.index + 1;
        if (this.progress.len != 0) {
          this.progress.percentage = Math.floor(
            (index / this.progress.len) * 100
          );
        }
      } else if (res.flag == "end"){
        //关闭连接
        this.$WebSocket.websocketclose();
        this.concelProcess();
      }else if (res.flag == "error"){
           const h = this.$createElement;
            this.$notify({
            title: '错误提示',
            message: h('i', { style: 'color: teal'}, res.data.msg)
        });
      }
    },
  },
};
</script>