<template>
  <div class="container">
    <div class="gaitContainer">
      <div class="form-box">
        <el-form
          ref="form"
          :model="gaitComparisonForm"
          :label-width="formLabelWidth"
        >
          <el-form-item label="剪影序列1:" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input v-model="gaitComparisonForm.path1" placeholder="选择剪影序列">
                  <el-button
                    slot="append"
                    icon="el-icon-folder"
                    type="success"
                    @click="selectPathDir('path1')"
                  ></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button
                  @click="show(gaitComparisonForm.path1)"
                  type="primary"
                  >显示</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="剪影序列2:" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input  v-model="gaitComparisonForm.path2" placeholder="选择剪影序列">
                  <el-button
                    slot="append"
                    icon="el-icon-folder"
                    type="success"
                    @click="selectPathDir('path2')"
                  ></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button
                  @click="show(gaitComparisonForm.path2)"
                  type="primary"
                  >显示</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitProcess"
              >比对</el-button
            >
            <el-button @click="concelProcess">重置</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          :visible.sync="centerDialogVisible"
          width="30%"
          :show-close="false"
          :before-close="handleClose"
        >
          <el-row>两个图像序列计算结果如下</el-row>
          <el-row> 欧式距离: {{ norm_dist }}</el-row>
          <el-row>余弦相似度: {{ cos_dist }}</el-row>
          <el-row>皮尔逊相关系数: {{ pearson_dist }}</el-row>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="concelProcess">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { showFullScreenLoading, hideFullScreenLoading } from "@/loading";
import { selectDocumentPath, showDir } from '@/filesystemOperator'
export default {
  data() {
    return {
      centerDialogVisible: false,
      gaitComparisonForm: {
        path1:"",
        //   "C:\\Users\\longhao\\Desktop\\GaitProject_BackEnd\\GaitSet\\dataset\\CASIA_64\\001\\bg-01\\000",
        path2:""
        //   "C:\\Users\\longhao\\Desktop\\GaitProject_BackEnd\\GaitSet\\dataset\\CASIA_64\\001\\bg-02\\000",
      },
      formLabelWidth: "100px",
      norm_dist: "",
      cos_dist: "",
      pearson_dist: "",
    };
  },
  destroyed () {
      this.$WebSocket.websocketclose()
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    selectPathDir(variableName){
        if(variableName=='path1'){
            selectDocumentPath((res)=>{
                this.gaitComparisonForm.path1=res
            })
        }else if (variableName=='path2'){
            selectDocumentPath((res)=>{
                this.gaitComparisonForm.path2=res
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
          console.log("重新发起")
        this.$WebSocket.WebSocketFn(() => {
          this.submitSend();
        });
      } else {
        console.log("继承原来的")
        this.submitSend();
      }
      showFullScreenLoading(".gaitContainer");
    },
    submitSend() {
      this.$WebSocket.send(
        {
          serviceName: "gaitComparison",
          data: this.gaitComparisonForm,
        },
        false
      )
      this.$WebSocket.onmessage(this.receiveDataProcess);
    },
    receiveDataProcess(res) {
      hideFullScreenLoading(".gaitContainer");
      if (res.flag == "content") {
        this.norm_dist = res.data.norm_dist;
        this.cos_dist = res.data.cos_dist;
        this.pearson_dist = res.data.pearson_dist;
        this.centerDialogVisible = true;
      } else if (res.flag == "end") {
        //关闭连接
        this.$WebSocket.websocketclose();
      } else if (res.flag == "error"){
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

<style scoped>
</style>