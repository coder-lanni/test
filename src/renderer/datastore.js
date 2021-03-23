import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
var db={};
db.silhouette = new Datastore({
  autoload:true,
  filename:path.join(remote.app.getAppPath(),'/silhouette.db')
});
db.gaitComparison = new Datastore({
  autoload:true,
  filename:path.join(remote.app.getAppPath(),'/gaitComparison.db')
});
db.default = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getAppPath(), '/default.db')
})

export default db