function removeTrailingSpaces(part) {
  return `${part}`.replace(/\/$/, '');
}

function getURL(...parts) {
  return parts.map(removeTrailingSpaces).join('/');
}

function extractBody(response) {
  return response.json();
}

module.exports = {
  getURL,
  extractBody
};