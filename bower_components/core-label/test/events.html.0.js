
      var inside = document.querySelector('#inside');
      var outside = document.querySelector('#outside');
      var selector = document.querySelector('#selector');

      suite('event handling', function() {

        suite('target inside', function() {
          var target = inside.querySelector('[for]');

          test('target has aria-labelledby', function() {
            var label = target.getAttribute('aria-labelledby');
            assert.equal(label, 'inside');
          });

          test('tap on label goes to the target', function() {
            var e = new CustomEvent('tap');
            var count = 0;
            var fn = function(ev) {
              count++;
            };
            Polymer.addEventListener(target, 'tap', fn);
            inside.dispatchEvent(e);
            assert.equal(count, 1);
            Polymer.removeEventListener(target, 'tap', fn);
          });

          test('tap on target does not recurse', function() {
            var e = new CustomEvent('tap', {bubbles: true, cancelable: true});
            var count = 0;
            var fn = function(ev) {
              count++;
              if (count > 1) {
                assert.fail('count higher than expected');
              }
            };
            Polymer.addEventListener(target, 'tap', fn);
            target.dispatchEvent(e);
            assert.equal(count, 1);
            Polymer.removeEventListener(target, 'tap', fn);
          });

          test('tap on label will "activate" target', function() {
            target.checked = false;
            var e = new CustomEvent('tap');
            inside.dispatchEvent(e);
            assert.equal(target.checked, true);
          });
        });

        suite('target outside', function() {
          var target = document.querySelector('#outside-checkbox');

          test('target has aria-labelledby', function() {
            var label = target.getAttribute('aria-labelledby');
            assert.equal(label, 'outside');
          });

          test('tap on label goes to the target', function() {
            var e = new CustomEvent('tap');
            var count = 0;
            var fn = function(ev) {
              count++;
            };
            Polymer.addEventListener(target, 'tap', fn);
            outside.dispatchEvent(e);
            assert.equal(count, 1);
            Polymer.removeEventListener(target, 'tap', fn);
          });

          test('tap on label will "activate" target', function() {
            target.checked = false;
            var e = new CustomEvent('tap');
            outside.dispatchEvent(e);
            assert.equal(target.checked, true);
          });
        });

        suite('target by query selector', function() {
          var target = document.querySelector('.target');

          test('target has aria-labelledby', function() {
            var label = target.getAttribute('aria-labelledby');
            assert.equal(label, 'selector');
          });

          test('tap on label goes to the target', function() {
            var e = new CustomEvent('tap');
            var count = 0;
            var fn = function(ev) {
              count++;
            };
            Polymer.addEventListener(target, 'tap', fn);
            selector.dispatchEvent(e);
            assert.equal(count, 1);
            Polymer.removeEventListener(target, 'tap', fn);
          });

          test('tap on label will "activate" target', function() {
            target.checked = false;
            var e = new CustomEvent('tap');
            selector.dispatchEvent(e);
            assert.equal(target.checked, true);
          });
        });

      });
    