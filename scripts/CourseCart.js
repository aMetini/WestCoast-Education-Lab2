class CourseCart {
    constructor() {
        this.shoppingCartArray = [];
    }

AddCourseToCart(Course) {
    this.shoppingCartArray.push(Course);
}

RemoveCourseFromCart(Course) {
    var index = this.shoppingCartArray.indexOf(Course);
    if(index > -1) {
        this.shoppingCartArray.splice(index, 1);
    }
}

ListCoursesInCart() {
    this.shoppingCartArray.forEach(item => {
        console.log(item);
    });
}

clearShoppingCart() {
    this.shoppingCartArray = [];
}

getShoppingCartArray () {
    return this.shoppingCartArray;
}
};