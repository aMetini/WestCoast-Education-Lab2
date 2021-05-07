'use strict'

const listCoursesButton = document.querySelectorAll('.listCourses');
const coursesSection = document.querySelector('#showCourses');

const courseCartList = document.querySelector('#courseCartList');
const shoppingCartButton = document.querySelector('#viewCartButton');
const shoppingCartModal = document.querySelector('#viewCartModal');
const modalDialog = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeShoppingCartModal = document.querySelector('#closeViewCartModal');
//const closeShoppingCartButton = document.querySelector('#closeViewCart');
const RemoveShoppingCartButton = document.querySelector('#remove');
const shoppingCartItems = document.querySelector('#viewCart-container');
//const shoppingCartHeader = document.querySelector('#viewCartHeader');

const listCourses = function() {
    fetch('/data/courses.json')
        .then(response => response.json())
        .then(data => console.log(data))
}

const images = document.querySelectorAll('.course img');
console.log(images);

//Get Courses Function

function getCourses(coursesArray) {
    coursesSection.innerHTML='';
    console.log(coursesArray.length);
    
            coursesArray.forEach(item => {
                coursesSection.insertAdjacentHTML(
                    'beforeend',
                    `<div>
                        <a href=course-details.html?courseId=${item.id}>
                    <div class="course">
                    <p>${item.title} <img id = "${item.courseNumber}" src = "/content/img/${item.imageName}.jpg" alt = "" /></p>
            
                    </div>
                    </a>
                    <div class="display-flex">
                    
                    <button type="button" onclick="AddCourseToCart('${item.courseNumber}')" class="btn btn-primary" id="${item.id}">Add To Cart</button>
                    </div>
                    </div>`)
            })

    }

            console.log(document.querySelectorAll('.course img'));

// Get New Course Cart

var globalCoursesArray = [];
var courseCart = new CourseCart();
CreateCoursesArray();
function getCoursesFromArray(coursesArray) {
    getCourses(coursesArray);
    globalCoursesArray = coursesArray;
}
 
// Add Course To Cart Function

function AddCourseToCart(courseNumber) {
    console.log(courseNumber);
    let course = {}
    globalCoursesArray.forEach(item => {
        if (item.courseNumber == courseNumber) {
            course = item;
            courseCart.AddCourseToCart(course);
            alert("Added " + course.title + " to your shopping cart");
        }
    })
    if (course != {}) {
        console.log(course.title);
    }
    else {
        console.log("Course not found");
    }

    
}
            
// Open View Cart Window

 shoppingCartButton.addEventListener('click', (e) => {
     e.preventDefault();

     openModal();

     shoppingCartItems.classList.remove('hidden');
     overlay.classList.remove('hidden');
     modalDialog.classList.remove('hidden');
 })

const openModal = function() {
    console.log(courseCart);
    //const showCourseCart = document.querySelector('#viewCart-container');
    courseCartList.innerHTML='';
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    courseCart.getShoppingCartArray().forEach(item => {
    console.log(item);
  

    var cartRowContents = "<div id=" + item.id + "> Title: " + item.title + " (" + item.price + ") <button class=\"btn btn-secondary\" value=" + item.id + " id=\"remove\">Remove</button></div>";
    cartRow.innerHTML=cartRowContents;
    courseCartList.innerHTML+=cartRow.innerHTML;
    console.log(courseCartList);

    });

    overlay.classList.remove('hidden');
    modalDialog.classList.remove('hidden');
}

RemoveShoppingCartButton.addEventListener('click', (e) => {
    e.preventDefault();

    RemoveCourseFromCart();
})

const quitModal = () => {
    modalDialog.classList.add('hidden');
    overlay.classList.add('hidden');
};

closeShoppingCartModal.addEventListener('click', quitModal);
overlay.addEventListener('click', quitModal);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!modalDialog.classList.contains('hidden')) {
            quitModal();
        }
    }
});
