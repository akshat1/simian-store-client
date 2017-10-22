const { fetch }  = require('fetch-ponyfill')();
const util = require('./util');

const {
  getURL,
  extractBody
} = util;

module.exports = function create(serverURL, modelName, instanceData) {
  const url = getURL(serverURL, modelName);
  const opts = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: Array.isArray(instanceData) ? instanceData : [instanceData]
    })
  };

  return fetch(url, opts).then(extractBody);
}
