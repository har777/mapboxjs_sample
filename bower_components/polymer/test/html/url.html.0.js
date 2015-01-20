
  addEventListener('HTMLImportsLoaded', function() {
    function getUrl(template, id, attr) {
      return template.content.querySelector('#' + id).getAttribute(attr);
    }

    var t = document.querySelector('template');
    Polymer.urlResolver.resolveTemplate(t);

    chai.assert.equal(getUrl(t, 'a', 'href'), '/1/2');
    chai.assert.equal(getUrl(t, 'b', 'href'), '3/4');
    chai.assert.equal(getUrl(t, 'c', 'href'), '{{ path }}/baz');
    chai.assert.equal(getUrl(t, 'd', 'href'), '#');
    chai.assert.equal(getUrl(t, 'e', 'href'), '?foo');

    t = document.getElementById('url-import').import.querySelector('template');
    Polymer.urlResolver.resolveTemplate(t);

    chai.assert.equal(getUrl(t, 'a', 'href'), '/1/2');
    chai.assert.equal(getUrl(t, 'b', 'href'), 'url-import/3/4');
    chai.assert.equal(getUrl(t, 'c', 'href'), '{{ path }}/baz');
    chai.assert.equal(getUrl(t, 'd', 'href'), '#');
    chai.assert.equal(getUrl(t, 'e', 'href'), 'url-import/url-import.html?foo');

    done();
  });
  