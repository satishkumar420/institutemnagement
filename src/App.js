import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";
import Dashboard from "../src/components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Mainnav/Home";
import Courses from "./Mainnav/Courses";
import AddCourse from "./Mainnav/AddCourse";
import Students from "./Mainnav/Students";
import AddStudent from "./Mainnav/AddStudent";
import CollectFee from "./Mainnav/CollectFee";
import PayHistory from "./Mainnav/PayHistory";
import CourseDetail from "./Mainnav/CourseDetail";
import StudentDetail from "./Mainnav/StudentDetail";

const App = () => {
  const router = createBrowserRouter([
    { path: "", Component: Login },
    { path: "login", Component: Login },
    { path: "signup", Component: Signup },
    {
      path: "dashboard",
      Component: Dashboard,
      children: [
        { path: "", Component: Home },
        { path: "home", Component: Home },
        { path: "courses", Component: Courses },
        { path: "add-course", Component: AddCourse },
        { path: "students", Component: Students },
        { path: "add-student", Component: AddStudent },
        { path: "collect-fee", Component: CollectFee },
        { path: "pay-history", Component: PayHistory },
        {path : "course-detail/:id",Component:CourseDetail},
        {path : "update-course/:id",Component:AddCourse},
        {path : "update-student/:id",Component:AddStudent},
        {path : "student-detail/:id",Component:StudentDetail}
      ],
    },
  ]);  

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
