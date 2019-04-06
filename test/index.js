const buildTestPage = require(`./build`);
const runTests      = require(`./jasmine`);

buildTestPage()
.then(runTests)
.catch(console.error);
