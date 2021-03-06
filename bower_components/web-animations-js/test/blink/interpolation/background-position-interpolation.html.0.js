
// Test equal number of position values as background images.
assertInterpolation({
  property: 'background-position',
  from: '0px 0px, 0px 0px, 0px 0px, 0px 0px',
  to: '80px 80px, 80px 80px, 80px 80px, 80px 80px',
}, [
  {at: -0.25, is: '-20px -20px, -20px -20px, -20px -20px, -20px -20px'},
  {at: 0, is:     '  0px   0px,   0px   0px,   0px   0px,   0px   0px'},
  {at: 0.25, is:  ' 20px  20px,  20px  20px,  20px  20px,  20px  20px'},
  {at: 0.5, is:   ' 40px  40px,  40px  40px,  40px  40px,  40px  40px'},
  {at: 0.75, is:  ' 60px  60px,  60px  60px,  60px  60px,  60px  60px'},
  {at: 1, is:     ' 80px  80px,  80px  80px,  80px  80px,  80px  80px'},
  {at: 1.25, is:  '100px 100px, 100px 100px, 100px 100px, 100px 100px'},
]);

// Test single position value repeated over background images.
assertInterpolation({
  property: 'background-position',
  from: 'top 0px left 0px',
  to: 'left 80px top 80px',
}, [
  {at: -0.25, is: '-20px -20px, -20px -20px, -20px -20px, -20px -20px'},
  {at: 0, is:     ' top 0px left 0px,   0px   0px,   0px   0px,   0px   0px'},
  {at: 0.25, is:  ' 20px  20px,  20px  20px,  20px  20px,  20px  20px'},
  {at: 0.5, is:   ' 40px  40px,  40px  40px,  40px  40px,  40px  40px'},
  {at: 0.75, is:  ' 60px  60px,  60px  60px,  60px  60px,  60px  60px'},
  {at: 1, is:     ' left 80px top 80px,  80px  80px,  80px  80px,  80px  80px'},
  {at: 1.25, is:  '100px 100px, 100px 100px, 100px 100px, 100px 100px'},
]);

// Test mismatched numbers of position values.
assertInterpolation({
  property: 'background-position',
  from: '0px 0px, 80px 0px',
  to: '40px 40px, 80px 80px, 0px 80px',
}, [
  {at: -0.25, is: '-10px -10px, 80px -20px, 0px -20px, 90px -10px'},
  {at: 0, is:     '  0px   0px, 80px   0px, 0px   0px, 80px   0px'},
  {at: 0.25, is:  ' 10px  10px, 80px  20px, 0px  20px, 70px  10px'},
  {at: 0.5, is:   ' 20px  20px, 80px  40px, 0px  40px, 60px  20px'},
  {at: 0.75, is:  ' 30px  30px, 80px  60px, 0px  60px, 50px  30px'},
  {at: 1, is:     ' 40px  40px, 80px  80px, 0px  80px, 40px  40px'},
  {at: 1.25, is:  ' 50px  50px, 80px 100px, 0px 100px, 30px  50px'},
]);
