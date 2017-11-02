const { fetch }  = require('fetch-ponyfill')();
const util = require('./util');

const {
  getURL,
  extractBody
} = util;

function delOne(serverURL, modelName, id) {
  return fetch(getURL(serverURL, modelName, id), { method: 'delete'});
}

function delAll(serverURL, modelName, opts) {
  const url = `${getURL(serverURL, modelName)}`;
  const requestOpts = {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts)
  };

  return fetch(url, requestOpts);
}

module.exports = async function del(serverURL, modelName, opts) {
  let p;
  if (typeof opts.id === 'undefined') {
    p = delAll(serverURL, modelName, opts);
  } else {
    p = delOne(serverURL, modelName, opts.id);
  }

  return p.then(extractBody);
}
