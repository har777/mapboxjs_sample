
        (function() {
          var a = [], a1 = [];
          Polymer('x-test', {
            ready: function() {
              this.a = a;
            },
            aChanged: function() {
              this.nextTest(arguments);
            },
            bChanged: function() {
              this.nextTest(arguments);
            },
            currentTest: 0,
            getCurrentTest: function() {
              return this['test' + this.currentTest];
            },
            nextTest: function(args) {
              var m = this.getCurrentTest();
              //console.log(this.currentTest);
              if (m) {
                m.apply(this, args);
              }
              this.currentTest++;
              if (!this.getCurrentTest()) {
                done();
              }
            },
            test0: function() {
              chai.assert.equal(this.a, a, 'array property is correct value');
              a.push(1);
            },
            test1: function() {
              chai.assert.equal(this.a, a, 'array property is correct value');
              chai.assert.equal(this.a.length, 1, 'noticed array addition');
              a.pop();
            },
            test2: function() {
              chai.assert.equal(this.a.length, 0, 'noticed array removal');
              this.a = a1;
            },
            test3: function() {
              chai.assert.equal(this.a, a1, 'array property mutated correctly');
              this.a.push(1);
              this.a.push(2);
            },
            test4: function(splices) {
              chai.assert.equal(this.a, a1, 'array property is correct value');
              chai.assert.equal(this.a.length, 2, 'noticed array addition');
              chai.assert.equal(arguments.length, 1, 'only 1 argument when array mutates');
              chai.assert.equal(splices[0].addedCount, 2, 'addedCount splice correctly sent in splices');
              this.a.shift();
            },
            test5: function(splices) {
              chai.assert.equal(this.a.length, 1, 'noticed array removal');
              chai.assert.equal(splices[0].removed.length, 1, 'removed splices correctly sent');
              a.push(55);
              setTimeout(this.nextTest.bind(this), 0);
            },
            test6: function() {
              chai.assert.equal(this.a.length, 1, 'old array properly unobserved');
              this.b = [];
              this.b.push(1);
            },
            test7: function() {
              chai.assert.equal(this.b.length, 1, 'noticed array addition');
              this.async(this.nextTest);
            },
            test8: function() {
              this.a = '';
            },
            test9: function() {
              this.parentNode.removeChild(this);
              setTimeout(this.nextTest.bind(this), 50);
            },
            test10: function() {
              // TODO: Flaky: 'expected undefined to be true'.
              chai.assert.isTrue(this._unbound, 'element unbound without error');
            }
          });
        })();
      