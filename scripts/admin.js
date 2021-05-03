'use strict';

const courseTable = document.querySelector('#course-list');
const tableView = document.querySelector('#tableView');
const addCourseView = document.querySelector('#addCourse-container');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const saveButton = document.querySelector('#save');
const courseNoInput = document.querySelector('#courseNoInput');
const titleInput = document.querySelector('#titleInput');
const descriptionInput = document.querySelector('#descriptionInput');
const lengthInput = document.querySelector('#lengthInput');
const categoryInput = document.querySelector('#categoryInput');
const priceInput = document.querySelector('#priceInput');
const addNewButton = document.querySelector('#addNewCourse');
const spinner = document.querySelector('#spinner');
const modalDialog = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

//Pagination info...
const numberOfCourses = document.querySelector('#numberOfVehicles');
const pageInfo = document.querySelector('#pageInfo');
const prevPage = document.querySelector('#prevPage').addEventListener('click', previousPageClicked);
const nextPage = document.querySelector('#nextPage').addEventListener('click', nextPageClicked);
const firstPage = document.querySelector('#firstPage').addEventListener('click', firstPageClicked);
const lastPage = document.querySelector('#lastPage').addEventListener('click', lastPageClicked);

let pagination = {};

const searchCourse= function () {
  if(searchInput !== null){
    if(searchInput.value.length === 0){
      loadCourses()
        .then(data => createTable(data))
        .catch(err => console.log(err));
    }else {
      findCourse(searchInput.value)
        .then(data => createTable(data))
        .catch(err => console.log(err));
    }
  }
};

searchButton.addEventListener('click', searchCourse);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchVehicle();
  }
});

saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  AddCourse()
    .then(data => {

      addCourseView.classList.add('hidden');
      tableView.classList.remove('hidden');
      modalDialog.classList.add('hidden');
      overlay.classList.add('hidden');
      courseNoInput.value = '';
      titleInput.value = '';
      descriptionInput.value = '';
      lengthInput.value = '';
      categoryInput.value = '';
      priceInput.value = '';
      loadCourses()
      .then(data => createTable(data));
    })
    .catch(err => console.log(err));
});

addNewButton.addEventListener('click', (e) => {
  e.preventDefault();

  addCourseView.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modalDialog.classList.remove('hidden');
});

function createTable(coursesList){
  vehicleTable.innerHTML = '';
  for (let course of vehiclesList) {
    createRow(course);
  }

  let tableRows = document.querySelectorAll('.table-container .delete');

  tableRows.forEach(item => {
    const courseId = item.parentNode.parentNode.children[1].firstChild.nodeValue;
    item.addEventListener('click', () => {
      deleteCourseClicked(courseId);
    });
  });

  tableRows = document.querySelectorAll('.table-container .edit');

  tableRows.forEach(item => {
    const courseId = item.parentNode.parentNode.children[1].firstChild.nodeValue;
    item.addEventListener('click', () => {
      location.href = `edit.html?courseId=${courseId}`;
    });
  });

  spinner.classList.add('hidden');
}

function createRow(car){
  vehicleTable.insertAdjacentHTML(
    'beforeend',
    `
      <tr>
        <td><i class="fal fa-pencil-alt edit"></i></td>
        <td>${course.id}</td>
        <td>${course.courseNumber}</td>
        <td>${course.title}</td>
        <td>${course.description}</td>
        <td>${course.length}</td>
        <td>${course.category}</td>
        <td>${course.price == undefined ? 0 : course.value}</td>
        <td><i class="far fa-trash-alt delete"></i></td>
      </tr>
    `
  );
}

function updatePagination(){
  numberOfVehicles.innerText = `Number of courses ${pagination.totalItems}`;
  pageInfo.innerText = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
}

function deleteCourseClicked(vehicleId) {
  removeCourse(courseId)
    .then(response => {
      loadVehicles()
      .then(data => createTable(data));
    })
    .catch(err => console.log(err));
}

const quitModal = () => {
  modalDialog.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeModal.addEventListener('click', quitModal);
overlay.addEventListener('click', quitModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modalDialog.classList.contains('hidden')) {
      quitModal();
    }
  }
});

function firstPageClicked(){
  loadVehicles(1)
    .then(data => createTable(data))
    .catch(err => console.log(err));
}

function lastPageClicked(){
  loadVehicles(pagination.totalPages)
    .then(data => createTable(data))
    .catch(err => console.log(err));
}

function previousPageClicked(){
  loadVehicles(pagination.currentPage > 1 ? pagination.currentPage - 1: 1)
    .then(data => createTable(data))
    .catch(err => console.log(err));
}

function nextPageClicked(){
  loadVehicles(pagination.currentPage < pagination.totalPages ? pagination.currentPage + 1 : pagination.totalPages)
    .then(data => createTable(data))
    .catch(err => console.log(err));
}

async function AddCourse() {
  const course = {
    courseId: courseId.value,
    courseNumber: courseNumber.value,
    title: title.value,
    description: description.value,
    length: length.value,
    category: category.value,
    price: price.value,
  };

  const response = await fetch('/data/courses.json', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  });

  if(!response.ok) throw new Error(response.statusText);

  return response.json();
};

async function removeVehicle(id){
  const response = await fetch('/data/courses.json', {
    method: 'DELETE',
    mode: 'cors'
  });

  if(!response.ok) throw new Error(response.statusText);
  
  return response.statusText;
}

async function findVehicle(regNo){
  spinner.classList.remove('hidden');
  const response = await fetch('data/courses.json')
  .then(response => response.json())
        .then(data => {
  if(!response.ok) throw new Error(response.statusText);

  return response.json();
});
}

async function loadCourses(page = 1){
  spinner.classList.remove('hidden');
  const response = await fetch('data/courses.json')
  .then(response => response.json())
        .then(data => {
            coursesList.innerHTML = '';

if(!response.ok){
    throw new Error(response.statusText);
}
  
  pagination = JSON.parse(response.headers.get('pagination'));
  updatePagination();
  return response.json();
});
}

loadCourses() 
.then(data => createTable(data))
.catch(err => console.log(err));
