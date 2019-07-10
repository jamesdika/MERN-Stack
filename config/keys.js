if (process.env.NODE_ENV === "production") {
  // we are in production so export production set of keys
  module.exports = require("./prod");
} else {
  // we are in development so export dev set of keys
  module.exports = require("./dev");
}
