'use strict';

const title = document.querySelector('#title');
const image = document.querySelector('#courseImage');
const courseNumber = document.querySelector('#courseNumber');
const length = document.querySelector('#length');
const category = document.querySelector('#category');
const price = document.querySelector('#price');
const description = document.querySelector('#description p');

let courseId = 0;

const urlParams = new URLSearchParams(location.search);

for (let [key, value] of urlParams) {
    if (key === 'courseId') courseId = value;
}
console.log(courseId);

const course = courses.find((course) => course.id == courseId);
console.log(course)

heading.innerText = course.title + " " + ":" + " " + course.category;
image.setAttribute('src', "/content/img/"+course.imageName + ".jpg");
courseNumber.innerHTML += " <span style='font-weight: bold;color: #ff0000'> " + course.courseNumber + "</span>";
category.innerText += ` ${course.category}`;
length.innerText += ` ${course.length}`;
price.innerText += `${course.price}`;

description.innerText = `${course.description}`;