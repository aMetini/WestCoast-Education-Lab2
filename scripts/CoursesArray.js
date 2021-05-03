function CreateCoursesArray() {
    let CourseArray = [];
    fetch('/data/courses.json')
        .then(response => response.json())
        .then(data => {
            
            for (let item of data) {
                
                let course = new Course(item.id, item.courseNumber, item.title, item.description, item.length, item.imageName, item.category, item.price);
                console.log(course);
                CourseArray.push(course);
                console.log(CourseArray.length);
            }
            console.log(CourseArray.length);
            getCoursesFromArray(CourseArray);
        })
    }
