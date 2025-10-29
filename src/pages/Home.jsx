import React, { useState, useEffect } from "react";
import HomePage from "./HomePage";
import CourseDetail from "./CourseDetail";
import ClassDetail from "./ClassDetail";
import seedData from "../seed/seedData";
import seedDataLive from "../seed/seedDataLive";

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

  useEffect(() => {
    // Immediately set courses and classes from seedData
    const enhancedCourses = seedData.map((course, index) => ({
      ...course,
      price: `$${(99 + index * 20).toFixed(2)}`,
      subjects: ["Programming Fundamentals", "Data Structures", "Algorithms", "Web Development", "Database Design"].slice(
        0,
        3 + (index % 3)
      ),
      benefits: ["Career advancement", "Hands-on coding", "Certification", "Lifetime access"].slice(
        0,
        4 + (index % 2)
      ),
    }));

    const enhancedClasses = seedDataLive.map((cls, index) => ({
      ...cls,
      subjects: cls.subjects,
      benefits: cls.benefits,
    }));

    setCourses(enhancedCourses);
    setClasses(enhancedClasses);
    setLoading(false);
  }, []);

  // Render loading while data is initializing
  if (loading) return <div className="text-center p-10">Loading...</div>;

  // Render CourseDetail or ClassDetail if selected
  if (currentView === "course-detail")
    return <CourseDetail item={selectedItem} onBack={handleBackToHome} />;
  if (currentView === "class-detail")
    return <ClassDetail item={selectedItem} onBack={handleBackToHome} />;

  // Render the HomePage normally
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

export default Home;
