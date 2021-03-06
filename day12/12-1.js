module.exports = function(data) {
  
  var numbers = data.match(/-\d+|\d+/g),
      result = 0;
  
  if(numbers === null ) return result;

  numbers.forEach( number => result += parseInt(number) );

  return result;

};