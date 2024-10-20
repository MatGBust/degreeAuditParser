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
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const requirements = [];
  let id = 0;

  const reqTitleElements = doc.getElementsByClassName('reqTitle');
  const reqTitles = Array.from(reqTitleElements);

  const excludedTitles = [
      "current/ future term schedule",
      "computer science engineering required non-major coursework",
      "THEMATIC PATHWAYS - COMPLETE THE CITIZENSHIP FOR A DIVERSE AND JUST WORLD THEME AND ONE ADDITIONAL THEME",
      "TRANSFER CREDIT: COURSE WORK THAT APPEARS HERE WILL NOT APPLY TO ANY DEGREE REQUIREMENTS.",
      "GENERAL GRADUATION REQUIREMENTS (MINIMUM HOURS: 126)",
      "general education reflection"
  ];

  reqTitles.forEach((reqTitleElement) => {
      const title = reqTitleElement.textContent.trim();
      if (excludedTitles.some(excluded => title.toLowerCase() === excluded.toLowerCase())) {
          return; // Skip excluded titles
      }

      const requirement = {};
      requirement.id = id++;
      requirement.title = title;

      const requirementNode = reqTitleElement.closest('.requirement');
      const completedCoursesElements = requirementNode.getElementsByClassName('completedCourses');

      requirement.class = { completed: [], incompleted: [], inProgress: [] };

      Array.from(completedCoursesElements).forEach((courseTable) => {
          const courses = courseTable.getElementsByClassName('takenCourse');
          Array.from(courses).forEach((courseRow) => {
              const courseData = {
                  term: courseRow.getElementsByClassName('term')[0]?.textContent.trim() || '',
                  course: courseRow.getElementsByClassName('course')[0]?.textContent.trim() || '',
                  credit: parseFloat(courseRow.getElementsByClassName('credit')[0]?.textContent.trim()) || 0,
                  grade: courseRow.getElementsByClassName('grade')[0]?.textContent.trim() || '',
                  completed: !courseRow.classList.contains('ip'),
                  inProgress: courseRow.classList.contains('ip')
              };
              if (courseData.inProgress) {
                  requirement.class.inProgress.push(courseData.course);
              } else {
                  requirement.class.completed.push(courseData.course);
              }
          });
      });

      const draggableCourses = requirementNode.getElementsByClassName('course draggable');
      if (draggableCourses.length) {
          requirement.class.incompleted = Array.from(draggableCourses).map(course => course.textContent.trim());
      }

      requirement.isCompleted = requirement.class.incompleted.length === 0 && requirement.class.inProgress.length === 0;

      console.log(requirement);
      requirements.push(requirement);
  });

  console.log(requirements);
  return requirements;
}
