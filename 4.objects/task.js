function Student(name, gender, age) {
    // Ваш код
    this.name = name;
    this.gender = gender;
    this.age = age;
};

new Student("Tony", "male", 37);
new Student("Buzz", "female", 35);

Student.prototype.setSubject = function (subjectName) {
  //ваш код
this.subject = subjectName;
};

Student.prototype.addMark = function (mark) {
  if (this.marks === undefined){ 
    this.marks = [mark]; 
    } else {
      this.marks.push(mark);
    }
};

Student.prototype.addMarks = function (...marks) {
  if(this.marks === undefined){ 
    this.marks = [...marks];
    } else {
      this.marks.push(...marks);
    }
};

Student.prototype.getAverage = function () {
  return this.marks.reduce((acc, item) => acc + item, 0) / this.marks.length;
};

Student.prototype.exclude = function (reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
};


