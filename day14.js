/*
--- Day 14: Reindeer Olympics ---

This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must rest occasionally to recover their energy. Santa would like to know which of his reindeer is fastest, and so he has them race.

Reindeer can only either be flying (always at their top speed) or resting (not moving at all), and always spend whole seconds in either state.

For example, suppose you have the following Reindeer:

Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
After one second, Comet has gone 14 km, while Dancer has gone 16 km. After ten seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the eleventh second, Comet begins resting (staying at 140 km), and Dancer continues on for a total distance of 176 km. On the 12th second, both reindeer are resting. They continue to rest until the 138th second, when Comet flies for another ten seconds. On the 174th second, Dancer flies for another 11 seconds.

In this example, after the 1000th second, both reindeer are resting, and Comet is in the lead at 1120 km (poor Dancer has only gotten 1056 km by that point). So, in this situation, Comet would win (if the race ended at 1000 seconds).

Given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, what distance has the winning reindeer traveled?
*/

var fs = require('fs'),
    input = fs.readFileSync(__dirname+'/assets/day14-input.js').toString(),
    lines = input.split('\n');

(function(data, afterTime) {
  
  var results = [];

  data.forEach(function(line) {
    
    var time = 0,
        distance = 0,
        phase = true,
        speed = parseInt(line.match(/\d+ km/g)),
        flyTime = parseInt(line.match(/\d+ se/g)[0]),
        restTime = parseInt(line.match(/\d+ se/g)[1]);

    while(time < afterTime){

      if(phase){

        if(time + flyTime > afterTime ){
           
           distance += (afterTime - time) * speed;
           time += afterTime - time;

        }else{
          
          distance += speed * flyTime 
          time += flyTime;  

        }
        
      }else{
        
        if(time + restTime > afterTime ){
          time += afterTime - time;
        }else{
          time += restTime; 
        }

      }

      phase = !phase;

    };

    results.push(distance);

  }); 
  
  console.log(results.sort(function(a,b) { return a<b; })[0]);

})(lines, 2503);



/*--- Part Two ---

Seeing how reindeer move in bursts, Santa decides he's not pleased with the old scoring system.

Instead, at the end of each second, he awards one point to the reindeer currently in the lead. 
(If there are multiple reindeer tied for the lead, they each get one point.) 
He keeps the traditional 2503 second time limit, of course, as doing otherwise would be entirely ridiculous.

Given the example reindeer from above, after the first second, 
Dancer is in the lead and gets one point. He stays in the lead until several seconds into 
Comet's second burst: after the 140th second, Comet pulls into the lead and gets his first point. 
Of course, since Dancer had been in the lead for the 139 seconds before that, he has accumulated 139 points by the 140th second.

After the 1000th second, Dancer has accumulated 689 points, while poor Comet, our old champion, 
only has 312. So, with the new scoring system, Dancer would win (if the race ended at 1000 seconds).

Again given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, 
how many points does the winning reindeer have?

*/


(function (data, totalTime) {
  
  var results = [];
  
  for (var i = 1; i <= totalTime; i++) {  

    var distancesInTimePoint = [];


    data.forEach(function(line, index) {
      
      var time = i,
          distance = 0,
          phase = true,
          memo = time,
          speed = parseInt(line.match(/\d+ km/g)),
          flyTime = parseInt(line.match(/\d+ se/g)[0]),
          restTime = parseInt(line.match(/\d+ se/g)[1]);

      results[index] = results[index] || 0;
      distancesInTimePoint[index] = distancesInTimePoint[index] || 0;

      (function calculatePosition () {
        if(memo === 0)return;
        if(phase){
          if(memo > flyTime){
            distance+=speed*flyTime;
            memo-=flyTime;
          }else{
            distance+=speed*memo;
            memo-=memo;
          }
        }else{
          if(memo > restTime){
            memo-=restTime;
          }else{
            memo-=memo;
          }
        }
        phase = !phase;
        calculatePosition();

      })();
      
      distancesInTimePoint[index] = distance;

    });
    
        
    resultsAtThisTimePoint = distancesInTimePoint.reduce(function(previousValue, currentValue, currentIndex) {
      return previousValue.concat(currentValue === Math.max.apply(Math, distancesInTimePoint) ? [currentIndex] : []);
    },[]);
    
    resultsAtThisTimePoint.forEach(function(v,i) {
      results[v] += 1;
    });
    
  };

  console.log(Math.max.apply(Math, results ) );

})(lines, 2503);