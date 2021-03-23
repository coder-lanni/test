<template>
  <div class="container">
    <div class="form-box">
      <el-form
        ref="form"
        :model="frameExtractForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="视频地址: " required>
          <el-row :gutter="4">
            <el-col :span="15">
              <el-input v-model="frameExtractForm.videoPath" placeholder="选择视频文件">
                <el-button
                  slot="append"
                  icon="el-icon-folder"
                  type="success"
                  @click="selectPathDir('videoPath')"
                ></el-button>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="preview"> 预览 </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="帧输出路径: " required>
          <el-row :gutter="4">
            <el-col :span="15">
              <el-input v-model="frameExtractForm.framePath" placeholder="选择帧保存目录">
                <el-button
                  slot="append"
                  icon="el-icon-folder"
                  type="success"
                  @click="selectPathDir('framePath')"
                ></el-button>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="show(frameExtractForm.framePath)"> 显示 </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="是否跨帧: ">
          <el-row :gutter="2">
            <el-col :span="5">
              <el-switch v-model="isAcrossFrame" active-text="跨帧">
              </el-switch>
            </el-col>
            <el-col :span="15" v-if="isAcrossFrame">
              <el-row>
                <el-col :span="5"> 帧数:</el-col>
                <el-col :span="8">
                  <el-select
                    v-model="acrossFrameNum"
                    filterable
                    allow-create
                    placeholder="选择或指定跨帧数"
                  >
                    <el-option
                      v-for="item in crossFrameOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="是否裁剪: ">
          <el-row :gutter="2">
            <el-col :span="5">
              <el-switch v-model="isCutFrame" active-text="裁剪"> </el-switch>
            </el-col>
            <el-col :span="15" v-if="isCutFrame">
              <el-row :gutter="2">
                <el-col :span="5">
                  <el-input
                    v-model="cutFrameIndex.widthStart"
                    placeholder="widthStart"
                  ></el-input
                ></el-col>
                <el-col :span="5">
                  <el-input
                    v-model="cutFrameIndex.widthEnd"
                    placeholder="widthEnd"
                  ></el-input
                ></el-col>
                <el-col :span="5">
                  <el-input
                    v-model="cutFrameIndex.hightStart"
                    placeholder="hightStart"
                  ></el-input
                ></el-col>
                <el-col :span="5">
                  <el-input
                    v-model="cutFrameIndex.hightEnd"
                    placeholder="hightEnd"
                  ></el-input
                ></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitProcess">开始处理</el-button>
          <el-button @click="concelProcess">重置</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        center
      >
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="progress.percentage"
        ></el-progress>
      </el-dialog>
      <!-- <el-dialog
        :visible.sync="videoPlayVisible"
        :show-close="true"
        center
      >
        <VideoPlay :videoPath="frameExtractForm.videoPath"></VideoPlay>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import {
  selectDocumentPath,
  selectVideoPath,
  showDir,
} from "@/filesystemOperator";

// import VideoPlay from "./VideoPlay";

export default {
  data() {
    return {
      videoPlayVisible: false,
      dialogVisible: false,
      frameExtractForm: {
        videoPath: "",
        framePath: "",
      },
      isAcrossFrame: false,
      isCutFrame: false,
      acrossFrameNum: [],
      cutFrameIndex: {
        widthStart: 0,
        widthEnd: 2560,
        hightStart: 0,
        hightEnd: 1440,
      },
      formLabelWidth: "100px",
      crossFrameOptions: [
        {
          value: 2,
          label: "跨2帧",
        },
        {
          value: 3,
          label: "跨3帧",
        },
        {
          value: 4,
          label: "跨4帧",
        },
        {
          value: 10,
          label: "跨10帧",
        },
      ],
      progress: {
        percentage: 0,
        len: 0,
      },
    };
  },
  // components: {
  //   VideoPlay,
  // },
  watch: {
    isAcrossFrame: {
      handler() {
        if (!this.isAcrossFrame) {
          this.acrossFrameNum = [];
          console.log(this.acrossFrameNum);
        }
      },
      immediate: true,
    },
    isCutFrame: {
      handler() {
        this.cutFrameIndex.widthStart = 0;
        this.cutFrameIndex.widthEnd = 2560;
        this.cutFrameIndex.hightStart = 0;
        this.cutFrameIndex.hightEnd = 1440;
        console.log(this.cutFrameIndex);
      },
      immediate: true,
    },
  },
  destroyed() {
    this.$WebSocket.websocketclose();
  },
  methods: {
    preview() {
      // this.videoPlayVisible = true;
      this.$message({
        message:'功能未实现',
        duration:500,
        type:'info'
      }
      );
    },
    selectPathDir(variableName) {
      if (variableName == "videoPath") {
        selectVideoPath((res) => {
          this.frameExtractForm.videoPath = res;
        });
      } else if (variableName == "framePath") {
        selectDocumentPath((res) => {
          this.frameExtractForm.framePath = res;
        });
      }
    },
    show(path) {
      if(path==""){
        this.$message({
        message:'请指定帧输出路径',
        duration:500,
        type:'error'
      }
      );
      }else{
        showDir(path);
      }
    },

    concelProcess() {
      Object.assign(this.$data, this.$options.data());
    },
    submitProcess() {
      if (this.checkSubmitValue()) {
        if (!this.$WebSocket.websocket) {
          console.log("重新发起");
          this.$WebSocket.WebSocketFn(() => {
            this.submitSend();
          });
        } else {
          console.log("继承原来的");
          this.submitSend();
        }
      }
    },
    checkSubmitValue() {
      if (
        this.frameExtractForm.videoPath == "" ||
        this.frameExtractForm.framePath == ""
      ) {
        this.$message.error("未选择视频或帧输出路径");
        return false;
      }
      return true;
    },
    submitSend() {
      console.log("测试hi hi" + this.acrossFrameNum);

      let submitData = {
        pathForm: this.frameExtractForm,
        isAcrossFrame: this.isAcrossFrame,
        acrossFrameNum: this.isAcrossFrame ? this.acrossFrameNum : 1,
        isCutFrame: this.isCutFrame,
        cutFrameIndex: this.cutFrameIndex,
      };
      this.$WebSocket.send(
        {
          serviceName: "frameExtract",
          data: submitData,
        },
        false
      );
      this.dialogVisible = true;
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
      } else if (res.flag == "end") {
        this.dialogVisible = false;
        //关闭连接
        this.$WebSocket.websocketclose();
      } else if (res.flag == "error") {
        const h = this.$createElement;
        this.$notify({
          title: "错误提示",
          message: h("i", { style: "color: teal" }, res.data.msg),
        });
      }
    },
  },
};
</script>