import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import type { RootState } from "../features/store";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  // ✅ State local seulement pour le formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ State global Redux
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login(formData))
      .unwrap()
      .then((data) => {
        if (data.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/teacher/dashboard");
        }
      });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-blue-50 to-yellow-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-yellow-500">School</span>{" "}
            <span className="text-sky-500">Attendance</span>
          </h1>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ✅ Error Redux */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-sky-400 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
