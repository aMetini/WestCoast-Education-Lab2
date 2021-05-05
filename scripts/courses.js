'use strict'

const listCoursesButton = document.querySelectorAll('.listCourses');
const coursesSection = document.querySelector('#showCourses');

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
                var cartRow = document.querySelector('div')
                cartRow.classList.add('cart-row')
                console.log(courseNumber);
                let course = {}
                globalCoursesArray.forEach(item => {
                    if (item.courseNumber == courseNumber) {
                        course = item;
                        courseCart.AddCourseToCart(course);
                    }
                })
                if (course != {}) {
                    console.log(course.title);
                }
                else {
                    console.log("Course not found");
                }

                courseCart.ListCoursesInCart();
            }
                var imageSrc = document.querySelectorAll('.course img');
                var cartRowContents = 
                    `<div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                    </div>`
                    cartRow.innerHTML = cartRowContents
                    cartRow.append(cartRow);
            
        
            
// Open View Cart Window

 shoppingCartButton.addEventListener('click', (e) => {
     e.preventDefault();

     shoppingCartItems.classList.remove('hidden');
     overlay.classList.remove('hidden');
     modalDialog.classList.remove('hidden');
 })

const openModal = function(courseCart, ListCoursesInCart) {
    const showCourseCart = document.querySelector('#viewCart-container');

    images.innerHTML = `<img src="${courseCart}" /><a class="btn" href="course-details.html?courseId=${id}">Discover Courses</a>`;

    overlay.classList.remove('hidden');
    modalDialog.classList.remove('hidden');
}

for (let image of images) {
    let src = image.getAttribute('src');
    let id = image.getAttribute('id');

    image.addEventListener('click', function() {
        openModal(src, id);
    });
}

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
