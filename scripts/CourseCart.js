class CourseCart {
    constructor() {
        this.clearCourseCart();
    }

get globalCoursesArray() {
    return this._globalCoursesArray;
}

set globalCoursesArray(value) {
    this._globalCoursesArray - value;
}

AddCourseToCart(Course) {
    this.globalCoursesArray.push(Course);
}

clearShoppingCart() {
    this.globalCoursesArray = [];
}
};