class CourseCart {
    constructor() {
        this.shoppingCartArray = [];
    }

AddCourseToCart(Course) {
    this.shoppingCartArray.push(Course);
}

RemoveCourseFromCart(id) {
    console.log("Remove Course: " + id);
    var index = -1;
    this.shoppingCartArray.forEach(item => {
        if(id == item.id)
        {
            index = this.shoppingCartArray.indexOf(item);
            console.log("Found Course Index: " + index);
        }
    });
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