<template>
  <div class="container">
    <div class="GaitInDatabaseContainer">
      <div class="form-box">
        <el-form
          ref="form"
          :model="gaitInDatbaseForm"
          :label-width="formLabelWidth"
        >
          <el-form-item label="剪影序列:">
            <el-row :gutter="4">
              <el-col :span="15">
                <el-input
                  v-model="gaitInDatbaseForm.path1"
                  placeholder="选择剪影目录"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-folder"
                    type="success"
                    @click="selectPathDir('path1')"
                  ></el-button>
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-button
                  type="primary"
                  @click="show(gaitInDatbaseForm.path1)"
                >
                  显示
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-form-item label="身份证号:">
            <el-row>
              <el-col :span="15"><el-input placeholder="输入人员身份证号"></el-input>
              </el-col>
            </el-row>
          </el-form-item> -->
          <el-form-item label="编号:">
            <el-row>
              <el-col :span="15"
                ><el-input
                  v-model="gaitInDatbaseForm.number"
                  placeholder="输入人员编号"
                ></el-input></el-col
            ></el-row>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-row>
              <el-col :span="15"
                ><el-input
                  v-model="gaitInDatbaseForm.name"
                  placeholder="输入人员姓名"
                ></el-input></el-col></el-row
          ></el-form-item>
          <el-form-item label="姓别:">
            <el-row>
              <el-col :span="15">
                <el-select v-model="gaitInDatbaseForm.gender">
                  <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitProcess">提交</el-button>
            <el-button @click="concelProcess">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <el-dialog title="信息确认" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="剪影路径：">
          {{ gaitInDatbaseForm.path1 }}</el-form-item
        >
        <el-form-item label="编号">{{ gaitInDatbaseForm.number }}</el-form-item>
        <el-form-item label="姓名：">{{ gaitInDatbaseForm.name }}</el-form-item>
        <el-form-item label="性别：">{{
          gaitInDatbaseForm.gender
        }}</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { selectDocumentPath, showDir } from "@/filesystemOperator";
import { showFullScreenLoading, hideFullScreenLoading } from "@/loading";
export default {
  data() {
    return {
      dialogVisible: true,
      gaitInDatbaseForm: {
        path1: "",
        gender: null,
        name: "",
        // IDCard:"",
        number: "",
      },
      timer: "",
      formLabelWidth: "100px",
      genderOptions: [
        {
          value: 0,
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
    };
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    show(path) {
      if (path == "") {
        this.$message({
          message: "请选择剪影序列",
          duration: 800,
          type: "error",
        });
      } else {
        showDir(path);
      }
    },

    selectPathDir(variableName) {
      if (variableName == "path1") {
        selectDocumentPath((res) => {
          this.gaitInDatbaseForm.path1 = res;
        });
      }
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
        showFullScreenLoading(".gaitSearchContainer");
        this.timer = setTimeout(this.mockCompute, 1000);
      }
    },
    checkSubmitValue() {
      if (
        this.gaitInDatbaseForm.path1 == "" ||
        this.gaitInDatbaseForm.gender == null ||
        this.gaitInDatbaseForm.name == "" ||
        this.gaitInDatbaseForm.number == ""
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
      hideFullScreenLoading(".gaitSearchContainer");
    //   this.dialogVisible = true;
        this.open()
    },
    open() {
      this.$alert("提交成功", "通知", {
        confirmButtonText: "确定",
        callback: (action) => {
        this.concelProcess()
        },
      });
    },
  },
};
</script>