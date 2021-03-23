<template>
  <div class="container">
    <div class="gaitSearchContainer">
      <div class="form-box">
        <el-form
          ref="form"
          :model="gaitSearchForm"
          :label-width="formLabelWidth"
        >
          <el-form-item label="剪影序列:">
            <el-row :gutter="4">
              <el-col :span="15">
                <el-input
                  v-model="gaitSearchForm.path1"
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
                <el-button type="primary" @click="show(gaitSearchForm.path1)">
                  显示
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="检索结果数目:">
            <el-row>
              <el-col :span="6">
                <el-select
                  v-model="gaitSearchForm.resultNum"
                  filterable
                  allow-create
                  placeholder="检索结果数目"
                >
                  <el-option
                    v-for="item in resultOptions"
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
            <el-button type="primary" @click="submitProcess">检索</el-button>
            <el-button @click="concelProcess">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="检索结果" :visible.sync="dialogVisible">
      <el-table :data="searchData">
        <el-table-column
          property="number"
          label="编号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="distance" label="相似度"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { selectDocumentPath, showDir } from "@/filesystemOperator";
import { showFullScreenLoading, hideFullScreenLoading } from "@/loading";
export default {
  data() {
    return {
      dialogVisible: false,
      timer: '',
      gaitSearchForm: {
        path1: "",
        resultNum: null,
      },
      searchData: [
        {
          number: "000061",
          name: "xx",
          distance: "0.99",
        },
        {
          number: "000042",
          name: "xx",
          distance: "0.88",
        },
        {
          number: "000039",
          name: "xx",
          distance: "0.86",
        },
        {
          number: "000098",
          name: "xx",
          distance: "0.85",
        },
        {
          number: "000025",
          name: "xx",
          distance: "0.83",
        },
      ],
      resultOptions: [
        {
          value: 1,
          label: "1",
        },
        {
          value: 5,
          label: "5",
        },
        {
          value: 10,
          label: "10",
        },
        {
          value: 20,
          label: "20",
        },
      ],
      formLabelWidth: "100px",
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
          this.gaitSearchForm.path1 = res;
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
        this.timer = setTimeout(this.mockCompute, 2000);
      }
    },
    checkSubmitValue() {
      if (
        this.gaitSearchForm.path1 == "" ||
        this.gaitSearchForm.resultNum == null
      ) {
        this.$message({
          message: "剪影序列或结果数未指定",
          duration: 800,
          type: "error",
        });
        return false;
      }
      return true;
    },
    mockCompute() {
      hideFullScreenLoading(".gaitSearchContainer");
      this.dialogVisible = true;
    },
  },
};
</script>