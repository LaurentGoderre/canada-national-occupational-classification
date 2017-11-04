/*eslint-env node*/
module.exports = function(data) {
	data = data || require("./src/noc.json");

	return require("./src/noc.js")(data);
};
