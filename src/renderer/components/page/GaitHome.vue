<template>
  <el-container>
    <el-main>
      <el-row type="flex" :gutter="30">
        <el-col :span="6">
          <div class="grid-content bg-purple" @click="jumpTo('frameExtract')">
            <div class="icon-wrap"><i class="el-icon-edit"></i></div>
            视频帧提取
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" @click="jumpTo('reid')">
            <div class="icon-wrap"><i class="el-icon-scissors"></i></div>
            行人提取
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" @click="jumpTo('silhouette')">
            <div class="icon-wrap"><i class="el-icon-picture-outline"></i></div>
            剪影图生成
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="30">
        <el-col :span="6">
          <div class="grid-content bg-purple" @click="jumpTo('gaitInDatabase')">
            <div class="icon-wrap"><i class="el-icon-s-grid"></i></div>
            特征入库
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" @click="jumpTo('gaitSearch')">
            <div class="icon-wrap"><i class="el-icon-search"></i></div>
            <span>步态检索</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content" @click="jumpTo('gaitComparison')">
            <div class="icon-wrap"><i class="el-icon-circle-check"></i></div>
            步态比对
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>

export default {
    methods:{
        jumpTo (routePath) {
            this.$router.push(
                {
                    path:"/"+routePath
                }
            )
        }
    }
    
}
</script>
<style scoped>
.el-main {
    margin-top: 10%;
    margin-left: 12%;
    /* margin-right: 25%; */
}

.bg-purple {
    background: #324157;
  }

.grid-content {
    color:white;
    border-radius: 10px;
    height: 120px;
    margin-top: 30px;
    text-align: center;
    background: #324157;
}

.icon-wrap {
  height: 60px;
  margin: 10px;
  font-size: 60px;
}
</style>