import React, { useState, useEffect } from "react";
import HomePage from "./HomePage";
import CourseDetail from "./CourseDetail";
import ClassDetail from "./ClassDetail";

function Home({ userData }) {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCourseDetail = (course) => {
    setSelectedItem(course);
    setCurrentView("course-detail");
  };

  const handleClassDetail = (classItem) => {
    setSelectedItem(classItem);
    setCurrentView("class-detail");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedItem(null);
  };

  // Fetch courses and classes data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coursesResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        const coursesData = await coursesResponse.json();
        const classesResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        const classesData = await classesResponse.json();

        const enhancedCourses = coursesData.map((course, index) => ({
          ...course,
          id: course.id,
          price: `$${(99 + index * 20).toFixed(2)}`,
          duration: `${2 + index} hours`,
          rating: (4 + Math.random()).toFixed(1),
          students: Math.floor(Math.random() * 1000) + 100,
          subjects: [
            "Programming Fundamentals",
            "Data Structures",
            "Algorithms",
            "Web Development",
            "Database Design",
            "Software Engineering",
          ].slice(0, 3 + (index % 3)),
          benefits: [
            "Career advancement opportunities",
            "Hands-on coding experience",
            "Industry-recognized certification",
            "Lifetime access to materials",
            "Community support",
            "Portfolio projects",
          ].slice(0, 4 + (index % 2)),
        }));

        const enhancedClasses = classesData.map((classItem, index) => ({
          ...classItem,
          id: classItem.id + 100,
          price: `$${(149 + index * 30).toFixed(2)}`,
          duration: `${4 + index * 2} weeks`,
          schedule: ["Mon & Wed", "Tue & Thu", "Weekends"][index % 3],
          instructor: [
            "John Smith",
            "Sarah Johnson",
            "Mike Chen",
            "Emily Davis",
          ][index % 4],
          maxStudents: 20,
          enrolled: Math.floor(Math.random() * 15) + 5,
          subjects: [
            "Live Coding Sessions",
            "Group Projects",
            "Code Reviews",
            "Q&A Sessions",
            "Real-world Projects",
          ].slice(0, 3 + (index % 3)),
          benefits: [
            "Live instructor guidance",
            "Peer learning environment",
            "Immediate feedback",
            "Networking opportunities",
            "Project portfolio",
            "Certificate of completion",
          ].slice(0, 4 + (index % 2)),
        }));

        setCourses(enhancedCourses);
        setClasses(enhancedClasses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Main render function
  if (currentView === "course-detail") {
    return <CourseDetail item={selectedItem} onBack={handleBackToHome} />;
  } else if (currentView === "class-detail") {
    return <ClassDetail item={selectedItem} onBack={handleBackToHome} />;
  } else {
    return (
      <HomePage
        open={open}
        setOpen={setOpen}
        userData={userData}
        courses={courses}
        classes={classes}
        loading={loading}
        onCourseDetail={handleCourseDetail}
        onClassDetail={handleClassDetail}
      />
    );
  }
}

export default Home;
