# pico 每日一题

[wiki](https://github.com/IITII/pico_daily/wiki)

> 对于 pico 论坛某些帖子进行回复测试  

* 仅供学习和测试使用, 请下载后24小时内删除, 请勿长期保存
* 若因此产生任何非正面影响, 后果自负

## 用法

1. git clone
2. npm i
3. 按需修改 config.js 
4. npm start 运行

### cookies

* 浏览器 F12 打开开发者工具
* 切换到 Network 标签页
* 刷新页面
* 找到 `https://leetcode-cn.com/graphql` 的请求
* 找到 `Request Headers` 中的 `cookie` 字段
* 将其复制到 `config.js` 中的 `cookies` 字段
* 保存

