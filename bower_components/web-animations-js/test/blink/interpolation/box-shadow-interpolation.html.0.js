
// Test basic functionality, and clipping blur at 0
assertInterpolation({
  property: 'box-shadow',
  from: '15px 10px 5px 6px black',
  to: '-15px -10px 25px -4px orange'
}, [
  {at: -0.3, is: '24px 16px 0px 9px black'},
  {at: 0, is: '15px 10px 5px 6px black'},
  {at: 0.3, is: '6px 4px 11px 3px rgb(77, 50, 0)'},
  {at: 0.6, is: '-3px -2px 17px 0px rgb(153, 99, 0)'},
  {at: 1, is: '-15px -10px 25px -4px orange'},
  {at: 1.5, is: '-30px -20px 35px -9px rgb(255, 248, 0)'},
]);

// Test padding shorter lists
assertInterpolation({
  property: 'box-shadow',
  from: '10px 20px rgba(255, 255, 0, 0.5), inset 5px 10em #008000',
  to: 'none'
}, [
  {at: -0.3, is: '13px 26px rgba(255, 255, 0, 0.65), inset 6.5px 39px rgb(0, 128, 0)'},
  {at: 0, is: '10px 20px rgba(255, 255, 0, 0.5), inset 5px 30px #008000'},
  {at: 0.3, is: '7px 14px rgba(255, 255, 0, 0.35), inset 3.5px 21px rgba(0, 128, 0, 0.7)'},
  {at: 0.6, is: '4px 8px rgba(255, 255, 0, 0.2), inset 2px 12px rgba(0, 128, 0, 0.4)'},
  {at: 1, is: '0px 0px 0px 0px transparent'},
  {at: 1.5, is: '-5px -10px rgba(255,255, 0, 0), inset -2.5px -15px rgba(0, 128, 0, 0)'},
]);

// Test unmatched inset
assertInterpolation({
  property: 'box-shadow',
  from: '10px 20px yellow, 5px 10px green',
  to: 'inset 5px 10px green, 15px 20px blue'
}, [
  {at: -0.3, is: '10px 20px yellow, 5px 10px green'},
  {at: 0, is: '10px 20px yellow, 5px 10px green'},
  {at: 0.3, is: '10px 20px yellow, 5px 10px green'},
  {at: 0.6, is: 'inset 5px 10px green, 15px 20px blue'},
  {at: 1, is: 'inset 5px 10px green, 15px 20px blue'},
  {at: 1.5, is: 'inset 5px 10px green, 15px 20px blue'},
]);
