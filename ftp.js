let Ftp = require("ftp");

let ftp = new Ftp();

module.exports = {
  connect(option) {
    return new Promise(resolve => {
      ftp.on("ready", resolve);
      ftp.connect(option);
    });
  },
  end() {
    ftp.end();
  },
  put(src, dest) {
    return new Promise(resolve => {
      ftp.put(src, dest, err => {
        if (err) {
          throw err;
        }
        resolve();
      });
    });
  },
  mkdir(dest) {
    return new Promise(resolve => {
      ftp.mkdir(dest, true, err => {
        if (err) {
          throw err;
        }
        resolve();
      });
    });
  }
};
