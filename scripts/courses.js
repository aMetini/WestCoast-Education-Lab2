'use strict'

const listCoursesButton = document.querySelectorAll('.listCourses');
const coursesSection = document.querySelector('#showCourses');

const listCourses = function() {
    fetch('/data/courses.json')
        .then(response => response.json())
        .then(data => console.log(data))
}

const images = document.querySelectorAll('.course img');
console.log(images);

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

            var globalCoursesArray = [];
            var courseCart = new CourseCart();
            CreateCoursesArray();
            function getCoursesFromArray(coursesArray) {
                getCourses(coursesArray);
                globalCoursesArray = coursesArray;
            }
 

            function AddCourseToCart(courseNumber) {
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
            

    


/*
courses.forEach(course => {
    courses.insertAdjacentHTML(
        'beforeend',
        `<div class = "course">
            <img id="${course.id}" src="/content/img/${course.imageName}.jpg" alt="${course.courseNumber} ${course.title}" />
            <p>${course.courseNumber} ${course.title}</p>
        </div>`
    );
});*/


/*
const openModal = function(imageSrc, id) {
    const image = document.querySelector('.modal-container');

    images.innerHTML = `<img src="${imageSrc}" /><a class="btn" href="course-details.html?courseId=${id}">Discover Courses</a>`;

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
}

closeModal.addEventListener('click', quitModal);

overlay.addEventListener('click', quitModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!modalDialog.classList.contains('hidden')) {
            quitModal();
        }*/
