let ftp = require("./ftp");
let option = require("./uploadftpOption");

(async () => {
  await ftp.connect(option);
  let data = await ftp.get("/wap_front/hybrid/config/sina_news.json");
  console.log(data);
})();
