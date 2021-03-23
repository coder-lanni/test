<template>
  <div id="mytitle" class="header">
    <div class="logo">步态识别系统</div>
    <div class="header-right">
        <Titlebtn type="min" />
        <Titlebtn type="max" />
        <Titlebtn type="close" />
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Titlebtn from './Titlebtn.vue';
export default {
  name: "Mytitle",
  components: {
    Titlebtn
  },
  methods: {

  },
};
</script>
    
<style>
#mytitle {
  width: 100%;
  height: 50px;
  background-color: #324157;
  -webkit-app-region: drag;
}

.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 20px;
    color: #fff;
}

.header .logo {
    float: left;
    padding-left: 15px;
    width: 250px;
    line-height: 50px;
}
.header-right {
    float: right;
    padding-right: 10px;
    line-height: 50px;
}
.titlebtn {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    -webkit-app-region: no-drag;
}
</style>