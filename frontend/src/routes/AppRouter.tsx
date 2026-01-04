import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import AdminLayout from '../layouts/AdminLayout';
import TeacherLayout from '../layouts/TeacherLayout';
import Dashboard from '../components/admin/Dashboard';
import DashboardTeacher from '../components/teacher/Dashboard';
import Class from '../components/admin/Class';
import Student from '../components/admin/Student';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="classes" element={<Class />}/>
        <Route path="students" element={<Student />}/>
      
      </Route>

      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardTeacher />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
