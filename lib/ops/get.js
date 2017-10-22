const { fetch }  = require('fetch-ponyfill')();
const util = require('./util');

const {
  getURL,
  extractBody
} = util;

function getOne(serverURL, modelName, id) {
  return fetch(getURL(serverURL, modelName, id), { method: 'get'});
}

function getAll(serverURL, modelName, opts) {
  const url = getURL(serverURL, modelName);
  const requestOpts = {
    method: 'post',
    body: JSON.stringify(opts)
  };

  return fetch(url, requestOpts);
}

/**
 * Retrieve instances of modelName from store.
 *
 * @param {string} serverURL - url of the api-endpoint.
 * @param {string} modelName - name of the model.
 * @param {Object} opts - must have either id or query.
 * @param {string} [opts.id] - id of the object; if a single object needs to be fetched.
 * @param {Object} [opts.query] - query, when searching for multiple objects.
 * @param {number} [opts.limit] - maximum number of objects to fetch. Used for pagination.
 * @param {number} [opts.offset] - where to fetch objects from. Used for pagination.
 * @param {Object} [opts.order] - specify sort order.
 * @returns {Object} - A promise.
 */
module.exports = async function get(serverURL, modelName, opts) {
  let p;
  if (typeof opts.id === 'undefined') {
    p = getAll(serverURL, modelName, opts);
  } else {
    p = getOne(serverURL, modelName, opts.id);
  }

  return p.then(extractBody);
}
