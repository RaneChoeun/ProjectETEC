// storage.js
export const loadCourses = () => {
  const data = localStorage.getItem("courses");
  return data ? JSON.parse(data) : [];
};

export const saveCourses = (courses) => {
  localStorage.setItem("courses", JSON.stringify(courses));
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
