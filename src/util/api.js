export const fetchData = async (subj, classNmbr) => {
  try {
    // Validate that both the subject and class number are provided.
    if (!subj || !classNmbr) {
      throw new Error("Both subject and class number must be provided.");
    }

    // Construct the API URL with properly separated subject and course number.
    const response = await fetch(`https://content.osu.edu/v2/classes/search?q=${encodeURIComponent(subj)}%20${encodeURIComponent(classNmbr)}&client=class-search-ui&campus=col&term=1252`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const course = data?.data?.courses[0]?.course;

    if (!course || !course.catalogNumber) {
      throw new Error("Course or catalogNumber is missing in the API response.");
    }

    // Construct the class data object with separate subject and class number fields
    const classData = {
      classNumber: course.catalogNumber,
      subject: course.subject,
      title: course.title,
      units: course.maxUnits,
      description: course.description,
      courseID: course.courseId
    };

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

  const excludedTitles = [
    "current/ future term schedule",
    "THEMATIC PATHWAYS - COMPLETE THE CITIZENSHIP FOR A DIVERSE AND JUST WORLD THEME AND ONE ADDITIONAL THEME",
    "TRANSFER CREDIT: COURSE WORK THAT APPEARS HERE WILL NOT APPLY TO ANY DEGREE REQUIREMENTS.",
    "GENERAL GRADUATION REQUIREMENTS (MINIMUM HOURS: 126)",
    "general education reflection",
    "BASIC MATH & SCIENCE - ABET REQUIREMENTS: 30 HR MIN",
    "THEMATIC PATHWAYS - COMPLETE THE CITIZENSHIP FOR A DIVERSEAND JUST WORLD THEME AND ONE ADDITIONAL THEME."
  ];

  Array.from(doc.getElementsByClassName('reqTitle')).forEach((reqTitleElement) => {
    const title = reqTitleElement.textContent.trim();
    if (excludedTitles.some(excluded => title.toLowerCase() === excluded.toLowerCase())) return;

    let lastSubject = ''; // Reset per requirement
    const requirement = {
      id: id++,
      title,
      class: { completed: [], incompleted: [], inProgress: [] },
      isCompleted: false
    };

    const requirementNode = reqTitleElement.closest('.requirement');
    if (!requirementNode) return;

    const completedCoursesElements = Array.from(requirementNode.getElementsByClassName('completedCourses'));
    completedCoursesElements.forEach((courseTable) => {
      Array.from(courseTable.getElementsByClassName('takenCourse')).forEach((completedCourseRow) => {
        const courseText = completedCourseRow.getElementsByClassName('course')[0]?.textContent.trim() || '';
        
        // Split the course text to handle cases where only course number is given
        const courseParts = courseText.split(/\s+/);
        let subject, courseNumber;
        
        if (courseParts.length === 2) {
          subject = courseParts[0];
          courseNumber = courseParts[1];
          lastSubject = subject;  // Update lastSubject
        } else if (courseParts.length === 1 && lastSubject) {
          // Use lastSubject if only course number is provided
          subject = lastSubject;
          courseNumber = courseParts[0];
        }

        // Verify both subject and course number are present
        if (subject && courseNumber) {
          const fullCourse = `${subject} ${courseNumber}`;
          const courseData = {
            term: completedCourseRow.getElementsByClassName('term')[0]?.textContent.trim() || '',
            course: fullCourse,
            credit: parseFloat(completedCourseRow.getElementsByClassName('credit')[0]?.textContent.trim() || '0') || 0,
            grade: completedCourseRow.getElementsByClassName('grade')[0]?.textContent.trim() || '',
            completed: !completedCourseRow.classList.contains('ip'),
            inProgress: completedCourseRow.classList.contains('ip')
          };

          // Add course to the appropriate list
          if (courseData.inProgress) {
            requirement.class.inProgress.push(courseData.course);
          } else {
            requirement.class.completed.push(courseData.course);
          }
        }
      });
    });

    const draggableCourses = Array.from(requirementNode.getElementsByClassName('course draggable'));
    requirement.class.incompleted = draggableCourses.map(course => {
      const courseText = course.textContent.trim();
      const courseParts = courseText.split(/\s+/);
      let subject, courseNumber;

      if (courseParts.length === 2) {
        subject = courseParts[0];
        courseNumber = courseParts[1];
        lastSubject = subject;
      } else if (courseParts.length === 1 && lastSubject) {
        subject = lastSubject;
        courseNumber = courseParts[0];
      }

      return subject && courseNumber ? `${subject} ${courseNumber}` : courseText;
    });

    requirement.isCompleted = requirement.class.incompleted.length === 0 && requirement.class.inProgress.length === 0;

    requirements.push(requirement);
  });

  return requirements;
}