const defaultPicDir='C:\\Users\\longhao\\Desktop\\GaitProject_BackEnd\\dataset'
function openDocumentHandler() {
    const { dialog } = require("electron").remote;
    return dialog.showOpenDialog({ properties: ["openDirectory"] });
}

export function selectVideoPath(fn) {
    const { dialog } = require("electron").remote;
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters:[{name: 'Movies',extensions:['avi','mp4']}]
        })
        .then((result) => {
            if (!result.canceled && result.filePaths.length > 0) {
              fn(result.filePaths[0])
            }
      })
      .catch((err) => {
        console.log(err);
      });
}

export function selectDocumentPath(fn) {
    openDocumentHandler()
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
            fn(result.filePaths[0])
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function showDir(path) {
    const { shell } = require("electron").remote;
    if (path==null || path==""){
        shell.openItem(defaultPicDir);
    }else{
        shell.openItem(path);
    }
}

export default {
    selectDocumentPath,
    selectVideoPath,
    showDir
}