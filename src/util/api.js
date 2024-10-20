export const fetchData = async (subj, classNmbr) => {
    try {
      const response = await fetch(`https://content.osu.edu/v2/classes/search?q=${subj}%20${classNmbr}&client=class-search-ui&campus=col&term=1252`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const course = data?.data?.courses[0].course;
      const classData = {
        classNumber: course.catalogNumber,
        subject: course.subject,
        title: course.title,
        units: course.maxUnits,
        description: course.description,
        courseID: course.courseId
      }

      return classData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

export function parseAuditHTML(htmlString) {
    // Create a DOMParser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    const requirements = [];
    let id = 0;

    // Select all requirement titles
    const reqTitleElements = doc.getElementsByClassName('reqTitle');

    // Convert HTMLCollection to Array for easier manipulation
    const reqTitles = Array.from(reqTitleElements);

    reqTitles.forEach((reqTitleElement) => {
      requirements[id] = {};
      requirements[id].id = id; 
        const reqTitle = reqTitleElement.textContent.trim();
        requirements[id].title = reqTitle;
        const completedCoursesElements = reqTitleElement.closest('.requirement').getElementsByClassName('completedCourses');

        // Initialize the object for this requirement
        requirements[id].class = {
            completed: [],
            incompleted: []
        };


        // Loop through all completed courses for this requirement
        Array.from(completedCoursesElements).forEach((courseTable) => {
            const courses = courseTable.getElementsByClassName('takenCourse');

            // Debugging to see each course row


            Array.from(courses).forEach((courseRow) => {
                const courseData = {
                    term: courseRow.getElementsByClassName('term')[0].textContent.trim(),
                    course: courseRow.getElementsByClassName('course')[0].textContent.trim(),
                    credit: parseFloat(courseRow.getElementsByClassName('credit')[0].textContent.trim()),
                    grade: courseRow.getElementsByClassName('grade')[0].textContent.trim(),
                    completed: !courseRow.classList.contains('ip') // Check if the course is in progress
                };
                requirements[id].class.completed.push(courseData.course);
            });
        });

        // Add any draggable courses under the requirement title
        const draggableCourses = reqTitleElement.closest('.requirement').getElementsByClassName('course draggable');
        if (draggableCourses.length) {
            requirements[id].class.incompleted = Array.from(draggableCourses).map(course => {return course.textContent.trim();});
        }

        id++;
    });

    console.log(requirements)
    return requirements;
}