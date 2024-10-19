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