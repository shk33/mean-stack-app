module.exports = {
  addHttpIfNotPresent: function(url) {
    if (!url) {
      return url;
    } else {
      if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
        url = 'http://' + url;
      }
      return url;
    }
  }
};