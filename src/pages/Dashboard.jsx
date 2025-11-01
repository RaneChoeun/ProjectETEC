import React, { useEffect, useState } from "react";
import { BookOpen, Users, Award, Plus, Video } from "lucide-react";
import seedDataLive from "../seed/seedDataLive";
import seedData from "../seed/seedData";
import { fileToBase64, loadCourses, saveCourses } from "../seed/storage.js";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const COLORS = [
    "#004F70", "#00BFFF", "#FF6347", "#FFD700",
    "#32CD32", "#8A2BE2", "#FF69B4", "#FF8C00"
  ];

  const initialCourses = loadCourses();
  const [courses, setCourses] = useState(initialCourses.length ? initialCourses : seedData || []);
  const [liveCourses, setLiveCourses] = useState(seedDataLive || []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState("Beginner");
  const [isLive, setIsLive] = useState(false);

  const categories = [
    "Web Development", "Data Science", "Design", "Business",
    "Mobile Development", "Programming", "Cybersecurity", "Machine Learning"
  ];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const totalOnlineStudents = courses.reduce((acc, c) => acc + (c.students || 0), 0);
  const totalLiveStudents = liveCourses.reduce((acc, c) => acc + (c.enrolled || 0), 0);

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const base = await fileToBase64(file);
    setImage(base);
  }

  function handleAddCourse(e) {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      title,
      description,
      category,
      image,
      instructor: "ChoeunRane",
      level,
      ...(isLive ? { enrolled: 0, status: "upcoming" } : { students: 0 }),
    };

    if (isLive) {
      setLiveCourses([newCourse, ...liveCourses]);
    } else {
      setCourses([newCourse, ...courses]);
    }

    // Reset form
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setImage(null);
    setLevel("Beginner");
  }

  const stats = [
    { title: "Total Courses", value: courses.length, icon: <BookOpen size={26} /> },
    { title: "Live Classes", value: liveCourses.length, icon: <Video size={26} /> },
    { title: "Online Students", value: totalOnlineStudents, icon: <Users size={26} /> },
    { title: "Live Students", value: totalLiveStudents, icon: <Users size={26} /> },
  ];

  const pieData = categories.map((cat, index) => ({
    name: cat,
    value: courses.filter(c => c.category === cat).length + liveCourses.filter(c => c.category === cat).length,
  }));

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{item.value}</h2>
            </div>
            <div className="text-[#004F70] dark:text-[#00BFFF]">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Course Categories Distribution</h2>
        {courses.length + liveCourses.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Courses`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 dark:text-gray-300">No courses available</p>
        )}
      </div>

      {/* Add Course Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
        <div className="flex gap-4 items-center">
          <label className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition
            ${!isLive ? "bg-[#004F70] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700"}`}
            onClick={() => setIsLive(false)}
          >
            Online Course
          </label>
          <label className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition
            ${isLive ? "bg-[#004F70] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700"}`}
            onClick={() => setIsLive(true)}
          >
            Live Course
          </label>
        </div>

        <form onSubmit={handleAddCourse} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg bg-transparent focus:ring-2 focus:ring-[#004F70]"
            required
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg bg-transparent focus:ring-2 focus:ring-[#004F70]"
          />
          <div className="flex gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#004F70]"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#004F70]"
            >
              {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
            </select>
          </div>
          <div className="flex flex-col items-start">
            <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
              {image ? "Change Image" : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {image && <img src={image} alt="Selected" className="mt-3 w-48 h-28 object-cover rounded-lg border" />}
          </div>
          <button className="w-full px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition">
            Add {isLive ? "Live Course" : "Online Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
