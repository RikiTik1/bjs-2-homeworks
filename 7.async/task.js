class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    };

    addClock(time, callback, id) {
        if(!id) {
            throw new Error('Heвозможно идентифицировать будильник. Параметр id не передан');
        };
      
        if(this.alarmCollection.some(element => element.id === id)) {
            console.error('Будильник с таким id уже существует');
            return;
        } else {
            this.alarmCollection.push({time, callback, id});
        };
    };

    removeClock(id){
        const initialLength = this.alarmCollection.length; 
        this.alarmCollection = this.alarmCollection.filter(element => element.id !== id);
        return this.alarmCollection.length !== initialLength; 
    };

    getCurrentFormattedTime(currentDate){
        currentDate = new Date();
        return (`${currentDate.getHours()}:${currentDate.getMinutes()}`);
    };

    start(){
        if(this.timerId){
            return;
        };
        
        this.timerId = setInterval(() => {
        this.alarmCollection.forEach(theBell => {
            if(theBell.time === this.getCurrentFormattedTime()){
            theBell.callback();
            }})
       }, 1000);
    };

    stop(){
        if(this.timerId){
         clearInterval(this.timerId);
         this.timerId = null;
        };
    };

    printAlarms(){
        this.alarmCollection.forEach((item) => console.log(item.id + "," + item.time));
        return;
    };

    clearAlarms(){
        this.stop();
        this.alarmCollection = [];
    };
    

};


function testCase(){
    let phoneAlarm = new AlarmClock();
    phoneAlarm.addClock('15:03', () => console.log('Пора вставать'), 1);
    phoneAlarm.addClock('15:04', () => {console.log('Пора вставать прямо сейчас'), phoneAlarm.removeClock(2)}, 2);
    phoneAlarm.addClock('15:04', () => console.log('Вставай уже'));
    phoneAlarm.addClock('15:05', () => {
        console.log('Вставай уже, а то проспишь'),
        phoneAlarm.clearAlarms();
        phoneAlarm.printAlarms();
    }, 3);
    phoneAlarm.addClock('15:06', () => console.log('ПОДЪЁМ!!!'), 1);
    phoneAlarm.printAlarms();
    phoneAlarm.start();
};
    