function parseCount(polleo) {
    const parsed = Number.parseInt(polleo);
    if(Number.isNaN(parsed)){
        throw new Error("Невалидное значение");
    }
    return parsed;
};

function validateCount(polleo){
   try {
    return parseCount(polleo);
   } catch(error) {
    return error;
   };
};

class Triangle {
    constructor(a, b, c){
        if (a + b < c || a + c < b || b + c < a) {
            throw new Error("Треугольник с такими сторонами не существует");
        };
        this.a = a;
        this.b = b;
        this.c = c;
    };
    getPerimeter() {
        return this.a + this.b + this.c;
    };

    getArea(){
        let a = this.getPerimeter() / 2;
        return +(Math.sqrt(a * (a - this.a) * (a - this.b) * (a - this.c))).toFixed(3);
    };
};

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch(error) {
        return {
            getArea: () => "Ошибка! Треугольник не существует",
            getPerimeter: () => "Ошибка! Треугольник не существует",
        };
    };
};

