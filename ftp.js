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
  get(dest) {
    return new Promise((resolve, reject) => {
      ftp.get(dest, (err, rs) => {
        if (err) {
          reject(err);
          return;
        }
        let data = "";
        rs.on("data", chunk => {
          data += chunk;
        });
        rs.on("end", () => {
          resolve(data);
        });
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
