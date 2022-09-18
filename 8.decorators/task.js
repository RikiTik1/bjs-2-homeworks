const addThree = (a, b, c) => a + b + c;
const upgradedAddThree = cachingDecoratorNew(addThree);
upgradedAddThree(1, 2, 3); // вычисляем: 6
upgradedAddThree(1, 2, 3); // из кэша: 6
upgradedAddThree(2, 2, 3); // вычисляем: 7
upgradedAddThree(3, 2, 3); // вычисляем: 8
upgradedAddThree(4, 2, 3); // вычисляем: 9
upgradedAddThree(5, 2, 3); // вычисляем: 10
upgradedAddThree(6, 2, 3); // вычисляем: 11   (при этом кэш для 1, 2, 3 уничтожается)
upgradedAddThree(1, 2, 3);
function cachingDecoratorNew(func) {
  let cache = [];
  
   function wrapper(...args) {
      const hash = args.join(',')
      let objectInCache = cache.find((item) => item.hash === hash);
      if (objectInCache) { 
          console.log('Из кэша: ' +  objectInCache.value);
          return "Из кэша: " + objectInCache.value;
      };
  
      let result = func(...args);
      cache.push({hash: hash, value: result});
      if (cache.length > 5) { 
        cache.shift(); 
      };
      console.log("Вычисляем: " + result);
      return "Вычисляем: " + result;  
  };
  return wrapper;
  };
  


function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  function wrapper(...args){
   wrapper.allCount++
   if(!timeoutId){
    func(...args);
    wrapper.count++;
   };
   clearTimeout(timeoutId);
   timeoutId = setTimeout(() => {
    func(...args);
    wrapper.count++;
   }, delay);
  };
  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper;
}
const sendSignal = (signalOrder) => console.log("Сигнал отправлен", signalOrder);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
setTimeout(upgradedSendSignal, 0, 1); // Сигнал отправлен + будет запланирован асинхронный запуск, который будет проигнорирован так как следующий сигнал отменит предыдущий (300 - 0 < 2000)
setTimeout(upgradedSendSignal, 300, 2); // проигнорировано так как следующий сигнал отменит предыдущий (900 - 300 < 2000)
setTimeout(upgradedSendSignal, 900, 3); // проигнорировано так как следующий сигнал отменит предыдущий (1200 - 900 < 2000)
setTimeout(upgradedSendSignal, 1200, 4); // проигнорировано так как следующий сигнал отменит предыдущий (2300 - 1200 < 2000)
setTimeout(upgradedSendSignal, 2300, 5); // Сигнал отправлен так как следующий вызов не успеет отменить текущий: 4400-2300=2100 (2100 > 2000)
setTimeout(upgradedSendSignal, 4400, 6); // проигнорировано так как следующий сигнал отменит предыдущий (4500 - 4400 < 2000)
setTimeout(upgradedSendSignal, 4500, 7); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с
setTimeout(() => {
  console.log(upgradedSendSignal.count); // было выполнено 3 отправки сигнала
  console.log(upgradedSendSignal.allCount); // было выполнено 6 вызовов декорированной функции
}, 7000)