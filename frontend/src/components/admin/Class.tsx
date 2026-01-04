import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  createClass,
  updateClass,
  deleteClass,
  clearError,
} from "../../features/classSlice";
import type { Class, CreateClassDTO, UpdateClassDTO } from "../../types/class.types";
import type { RootState, AppDispatch } from "../../features/store";

const ClassManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { classes, loading, error } = useSelector((state: RootState) => state.class);

  const [newClass, setNewClass] = useState<CreateClassDTO>({
    name: "",
    level: "",
    academicYear: "",
  });

  const [editClassId, setEditClassId] = useState<number | null>(null);
  const [editClassData, setEditClassData] = useState<UpdateClassDTO>({
    name: "",
    level: "",
    academicYear: "",
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleCreate = () => {
    if (!newClass.name || !newClass.level || !newClass.academicYear) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    dispatch(createClass(newClass));
    setNewClass({ name: "", level: "", academicYear: "" });
    setShowCreateForm(false);
  };

  const handleUpdate = (id: number) => {
    dispatch(updateClass({ id, data: editClassData }));
    setEditClassId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette classe ?")) {
      dispatch(deleteClass(id));
    }
  };

  const handleCancelEdit = () => {
    setEditClassId(null);
    setEditClassData({ name: "", level: "", academicYear: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                Gestion des Classes
              </h1>
              <p className="text-gray-600 mt-2">Créez et gérez les classes de votre établissement</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-sky-500 transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouvelle Classe
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
              <button onClick={() => dispatch(clearError())} className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="mb-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-sky-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
                Créer une nouvelle classe
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de la classe</label>
                <input
                  type="text"
                  placeholder="Ex: 1ère A"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Niveau</label>
                <input
                  type="text"
                  placeholder="Ex: Primaire"
                  value={newClass.level}
                  onChange={(e) => setNewClass({ ...newClass, level: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Année académique</label>
                <input
                  type="text"
                  placeholder="Ex: 2024-2025"
                  value={newClass.academicYear}
                  onChange={(e) => setNewClass({ ...newClass, academicYear: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-sky-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-sky-500 transition-all"
              >
                Créer la classe
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewClass({ name: "", level: "", academicYear: "" });
                }}
                className="px-6 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Total Classes</p>
                <p className="text-3xl font-bold text-gray-800">{classes.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-sky-300 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Niveaux</p>
                <p className="text-3xl font-bold text-gray-800">
                  {new Set(classes.map(c => c.level)).size}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Années actives</p>
                <p className="text-3xl font-bold text-gray-800">
                  {new Set(classes.map(c => c.academicYear)).size}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-300 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-yellow-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Liste des classes
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-4">
                <svg className="animate-spin h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 font-medium">Chargement des classes...</p>
              </div>
            </div>
          ) : classes.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
              <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-lg font-semibold mb-2">Aucune classe pour le moment</p>
              <p className="text-sm">Créez votre première classe pour commencer</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-100 to-yellow-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nom</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Niveau</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Année académique</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classes.map((classe) => (
                    <tr key={classe.id} className="hover:bg-gray-50 transition-colors">
                      {editClassId === classe.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editClassData.name}
                              onChange={(e) => setEditClassData({ ...editClassData, name: e.target.value })}
                              className="w-full px-3 py-2 border-2 border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editClassData.level}
                              onChange={(e) => setEditClassData({ ...editClassData, level: e.target.value })}
                              className="w-full px-3 py-2 border-2 border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editClassData.academicYear}
                              onChange={(e) => setEditClassData({ ...editClassData, academicYear: e.target.value })}
                              className="w-full px-3 py-2 border-2 border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleUpdate(classe.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md"
                              >
                                Enregistrer
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                              >
                                Annuler
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="w-10 h-10 bg-gradient-to-br from-sky-100 to-yellow-100 rounded-lg flex items-center justify-center font-bold text-sky-600">
                                {classe.name.charAt(0)}
                              </span>
                              <span className="font-semibold text-gray-800">{classe.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                              {classe.level}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                              {classe.academicYear}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setEditClassId(classe.id);
                                  setEditClassData({
                                    name: classe.name,
                                    level: classe.level,
                                    academicYear: classe.academicYear,
                                  });
                                }}
                                className="p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg group"
                                title="Modifier"
                              >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(classe.id)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;