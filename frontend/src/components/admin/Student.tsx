import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  updateStudent,
} from "../../features/studentsSlice";
import type { RootState, AppDispatch } from "../../features/store";
import type { Student, UpdateStudentDTO } from "../../types/student";

const StudentManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector(
    (state: RootState) => state.students
  );

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<UpdateStudentDTO>({});
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingId(student.id);
    setEditData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      classId: student.classId,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = (id: number) => {
    dispatch(updateStudent({ id, data: editData })).then(() => {
      setEditingId(null);
      setEditData({});
    });
  };

  // Stats calculées
  const totalStudents = students.length;
  const uniqueClasses = new Set(students.filter(s => s.class).map(s => s.class!.name)).size;
  const studentsWithEmail = students.filter(s => s.email).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                Gestion des Étudiants
              </h1>
              <p className="text-gray-600 mt-2">Consultez et gérez les informations de vos étudiants</p>
            </div>

            {/* Search & View Toggle */}
            <div className="flex gap-3">
              <div className="relative flex-1 md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un étudiant..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none bg-white/90 backdrop-blur-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-yellow-400 to-sky-400 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Vue tableau"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-yellow-400 to-sky-400 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Vue grille"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Total Étudiants</p>
                <p className="text-3xl font-bold text-gray-800">{totalStudents}</p>
                <p className="text-xs text-green-600 mt-1 font-medium">
                  {filteredStudents.length !== totalStudents && `${filteredStudents.length} affichés`}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-sky-300 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Classes</p>
                <p className="text-3xl font-bold text-gray-800">{uniqueClasses}</p>
                <p className="text-xs text-gray-500 mt-1">Classes différentes</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Avec Email</p>
                <p className="text-3xl font-bold text-gray-800">{studentsWithEmail}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {((studentsWithEmail / totalStudents) * 100).toFixed(0)}% du total
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-300 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center p-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 font-medium">Chargement des étudiants...</p>
            </div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl text-gray-500">
            <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-lg font-semibold mb-2">
              {search ? "Aucun étudiant trouvé" : "Aucun étudiant pour le moment"}
            </p>
            <p className="text-sm">
              {search ? "Essayez une autre recherche" : "Ajoutez votre premier étudiant pour commencer"}
            </p>
          </div>
        ) : viewMode === "table" ? (
          /* Table View */
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-yellow-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Liste des étudiants ({filteredStudents.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-100 to-yellow-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Étudiant</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Classe</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student: Student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      {editingId === student.id ? (
                        /* Edit Mode */
                        <>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editData.firstName}
                                onChange={(e) =>
                                  setEditData({ ...editData, firstName: e.target.value })
                                }
                                placeholder="Prénom"
                                className="flex-1 px-3 py-2 border-2 border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                              />
                              <input
                                type="text"
                                value={editData.lastName}
                                onChange={(e) =>
                                  setEditData({ ...editData, lastName: e.target.value })
                                }
                                placeholder="Nom"
                                className="flex-1 px-3 py-2 border-2 border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="email"
                              value={editData.email || ""}
                              onChange={(e) =>
                                setEditData({ ...editData, email: e.target.value })
                              }
                              placeholder="email@exemple.com"
                              className="w-full px-3 py-2 border-2 border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {student.class ? student.class.name : "-"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleSave(student.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md"
                              >
                                Enregistrer
                              </button>
                              <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                              >
                                Annuler
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        /* View Mode */
                        <>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {student.firstName} {student.lastName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {student.email ? (
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">{student.email}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Non renseigné</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {student.class ? (
                              <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                                {student.class.name}
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                                Aucune classe
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditClick(student)}
                                className="p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg group"
                                title="Modifier"
                              >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(student.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg group"
                                title="Supprimer"
                              >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student: Student) => (
              <div
                key={student.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all shadow-md"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {student.firstName} {student.lastName}
                  </h3>

                  {student.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{student.email}</span>
                    </div>
                  )}

                  {student.class ? (
                    <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                      {student.class.name}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                      Aucune classe
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;