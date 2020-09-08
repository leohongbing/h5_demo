/**
 * Created by lhb on 2020/9/7
 *
 * Description:
 * <p>
 */
console.log(1);
setTimeout(function() {
  console.log(2);
  Promise.resolve(1).then(function() {
    console.log('promise');
  })
})

setTimeout(function(){
  console.log(3);
})
