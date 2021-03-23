<template>
<el-container>
  <el-main>
      <el-row type="flex" :gutter="30">
          <el-col>
            <div class="grid-content bg-purple" @click = "dialog1Visible = true">
                <div class="icon-wrap"><i class="el-icon-edit"></i></div>视频帧提取
            </div>
          </el-col>
          <el-col>
            <div class="grid-content bg-purple" @click = "dialog2Visible = true">
                <div class="icon-wrap"><i class="el-icon-scissors"></i></div>图像裁剪
            </div>
          </el-col>
          <el-col>
            <div class="grid-content bg-purple" @click= "dialog3Visible = true">
                <div class="icon-wrap"><i class="el-icon-picture-outline"></i></div>剪影图生成
            </div>
          </el-col>
      </el-row>
      <el-row type="flex" :gutter="30">
          <el-col>
            <div class="grid-content bg-purple" @click= "dialog4Visible = true">
                <div class="icon-wrap"><i class="el-icon-s-grid"></i></div>特征入库
            </div>
          </el-col>
          <el-col>
            <div class="grid-content bg-purple" @click= "dialog5Visible = true">
                <div class="icon-wrap"><i class="el-icon-search"></i></div>步态检索
            </div>
          </el-col>
            <el-col>
              <div class="grid-content bg-purple" @click= "dialog6Visible = true">
                <div class="icon-wrap"><i class="el-icon-circle-check"></i></div>步态比对
              </div>
          </el-col>
      </el-row>
  </el-main>
    <el-dialog title="视频帧提取" :visible.sync="dialog1Visible" >
      <el-form :model="video2frame_form">
        <el-form-item label="视频文件" :label-width="formLabelWidth">
          <el-input v-model="video2frame_form.video_path" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openVideoPathFunc"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="帧存储路径" :label-width="formLabelWidth">
          <el-input v-model="video2frame_form.frame_path" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openDocumentFunc('video2frame_form.frame_path')"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click = "dialogConcelFunc">取 消</el-button>
        <el-button type="primary" @click = "dialogEnsureFunc">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图像裁剪" :visible.sync="dialog2Visible">
      <el-form :model="photo_cut_form">
        <el-form-item label="输入地址" :label-width="formLabelWidth">
          <el-input v-model="photo_cut_form.in_dir" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openRgbDir"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="输出地址" :label-width="formLabelWidth">
          <el-input v-model="photo_cut_form.out_dir" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openBinaryDir"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click = "dialogConcelFunc">取 消</el-button>
        <el-button type="primary" @click = "dialogEnsureFunc">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="剪影图生成" :visible.sync="dialog3Visible">
      <el-form :model="rgb2binary_form">
        <el-form-item label="原始图序列" :label-width="formLabelWidth">
          <el-input v-model="rgb2binary_form.inputPath" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openRgbDir"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="剪影输出路径" :label-width="formLabelWidth">
          <el-input v-model="rgb2binary_form.outputPath" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openBinaryDir"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click = "dialogConcelFunc">取 消</el-button>
        <el-button type="primary" @click = "submitRgb2binary1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="特征入库" :visible.sync="dialog4Visible">
      <el-form :model="gait_feature_form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="gait_feature_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓别" :label-width="formLabelWidth">
          <el-input v-model="gait_feature_form.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="gait_feature_form.id_num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="剪影图序列" :label-width="formLabelWidth">
          <el-input v-model="gait_feature_form.path1" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openRgbDir"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click = "dialogConcelFunc">取 消</el-button>
        <el-button type="primary" @click = "dialogEnsureFunc">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="步态检索" :visible.sync="dialog5Visible">
      <el-form :model="gait_search_form">
        <el-form-item label="剪影图序列" :label-width="formLabelWidth">
          <el-input v-model="gait_search_form.path1" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openRgbDir"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click = "dialogConcelFunc">取 消</el-button>
        <el-button type="primary" @click = "dialogEnsureFunc">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="步态比对" :visible.sync="dialog6Visible">
      <el-form :model="binary_form">
        <el-form-item label="剪影图序列1" :label-width="formLabelWidth">
          <el-input v-model="binary_form.path1" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openRgbDir"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="剪影图序列2" :label-width="formLabelWidth">
          <el-input v-model="binary_form.path2" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="openBinaryDir"></el-button>
          </el-input>openBinaryDir
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click = "dialogConcelFunc">取 消</el-button>
        <el-button type="primary" @click = "openBinaryDir">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="处理进度"
      :visible.sync="dialog7Visible"
      width="30%"
      :before-close="handleClose">
      <el-progress type="circle" :percentage=percentage></el-progress>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog7Visible = false">确 定</el-button>
      </span>
</el-dialog>
</el-container>
</template>
<script>
var tempPath=""
export default {
  name: 'home',
  data () {
    return {
      dialog1Visible: false,
      dialog2Visible: false,
      dialog3Visible: false,
      dialog4Visible: false,
      dialog5Visible: false,
      dialog6Visible: false,
      dialog7Visible: false,
      percentage:"0",
      formLabelWidth: '120px',
      tmpForm : {
        
      },
      video2frame_form: {
        video_path: "",
        frame_path: ""
      },
      photo_cut_form : {
        in_dir: "",
        out_dir: ""
      },
      rgb2binary_form: {
        inputPath: "C:\\Users\\longhao\\Desktop\\AlphaPose-pytorch\\AlphaPose-pytorch\\data\\0\\1",
        outputPath: "C:\\Users\\longhao\\Desktop\\AlphaPose-pytorch\\AlphaPose-pytorch\\outdata\\0",
      },
      gait_feature_form: {
        name: "",
        gender: "",
        id_num: "",
        path1: ""
      },
      gait_search_form: {
        path1: ""
      },
      binary_form: {
        path1: "",
        path2: ""
      }
    }
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    openFileHandler() {
      const { dialog } = require("electron").remote;
      return dialog.showOpenDialog({properties: ['openFile']})
    },

    openDocumentHandler() {
      const { dialog } = require("electron").remote;
      return dialog.showOpenDialog({properties: ['openDirectory']})
    },

    openVideoPathFunc () {
      const { dialog } = require("electron").remote;
      dialog.showOpenDialog({
        properties: ['openFile'],
        filters:[{name: 'Movies',extensions:['avi','mp4']}]
        }).then(result => {
        if (!result.canceled && result.filePaths.length>0){
          this.video2frame_form.video_path=result.filePaths[0]
        }
      }).catch(err => {
        console.log(err)
      })
    },

    openOutFramePathFunc () {
      this.openDocumentHandler().then(result => {
        if (!result.canceled && result.filePaths.length>0){
          this.video2frame_form.frame_path=result.filePaths[0]
        }
      }).catch(err => {
        console.log(err)
      })
    },

    openRgbDir () {
      this.openDocumentHandler().then(result => {
        if (!result.canceled && result.filePaths.length>0){
          this.rgb2binary_form.inputPath=result.filePaths[0]
        }
      }).catch(err => {
        console.log(err)
      })
    },
    openBinaryDir () {
      this.openDocumentHandler().then(result => {
        if (!result.canceled && result.filePaths.length>0){
          this.rgb2binary_form.outputPath=result.filePaths[0]
        }
      }).catch(err => {
        console.log(err)
      })
    },

    dialogConcelFunc () {
      Object.assign(this.$data,this.$options.data())
    },

    dialogEnsureFunc (item) {
      //submit process
      Object.assign(this.$data,this.$options.data())
      const h = this.$createElement;
      this.$notify({
          title: '通知',
          message: '任务正在执行,请在结束后查看结果'
      });
    },

    submitRgb2binary1() {
      this.$WebSocket.send(
        {
          serviceName: 'genSilhouette',
          data: this.rgb2binary_form
        }
      ,false)
    },

    submitRgb2binary () {
      this.$http.post(
        'http://127.0.0.1:8090/genSilhouette',
      this.rgb2binary_form,
        {
          headers: {
             "Content-Type": "application/json;charset=utf8"
        }
        }).then(
          res=>{

            console.log(res.data)
            var info
            if(res.data.success){
              info='执行成功'
            }else{
              info='执行失败'
            }
            this.$notify({
              title: "任务执行结果",
              message: info
            });
          })
      Object.assign(this.$data,this.$options.data())
    }



  }
}
</script>

<style>
.el-header {
    background-color: #0f77df;
}
.brand {
    text-align: left;
}

.brand-text {
    color:white;
    font-size: 130%;
    line-height: 60px;
}
.el-menu-demo {
    height: 50px;
}
.userinfo {
    text-align: right;
}
.el-dropdown-link {
    color: white;
    text-align: right;
    line-height: 60px;
}
.el-main {
    margin-top: 10%;
    margin-left: 25%;
    margin-right: 25%;
}

.bg-purple {
    background: #0f77df;
  }

.grid-content {
    color:white;
    border-radius: 10px;
    min-height: 120px;
    margin-top: 30px;
    text-align: center;
}

.icon-wrap {
    margin: 10px;
    font-size: 50px;
}
</style>
