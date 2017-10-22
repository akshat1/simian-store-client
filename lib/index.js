const _             = require('lodash');
const { ModelName } = require('./model');
const put           = require('./ops/put');
const get           = require('./ops/get');
const del           = require('./ops/del');

const serverURL = 'http://localhost:8080/';
function link(modelName) {
  return {
    // We specify -arity while currying so that mocking with sinon works.
    put: _.curry(put, 3)(serverURL, modelName),
    get: _.curry(get, 3)(serverURL, modelName),
    del: _.curry(del, 3)(serverURL, modelName)
  };
}

for (let key in ModelName) {
  module.exports[key] = link(ModelName[key]);
}

console.log(module.exports);
