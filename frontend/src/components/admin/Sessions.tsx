import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../features/store";
import { fetchSessions, createSession, clearError } from "../../features/sessionSlice";
import type { CreateSessionDTO } from "../../features/sessionSlice";

const Sessions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sessions, loading, error } = useSelector((state: RootState) => state.session);

  const [form, setForm] = useState<CreateSessionDTO>({
    date: "",
    startTime: "",
    endTime: "",
    classId: 0,
    subjectId: 0,
    teacherId: 0,
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["classId", "subjectId", "teacherId"].includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    if (!form.date || !form.startTime || !form.endTime || !form.classId || !form.subjectId || !form.teacherId) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    console.log("Envoi form:", form);
    dispatch(createSession(form));
    setForm({ date: "", startTime: "", endTime: "", classId: 0, subjectId: 0, teacherId: 0 });
    setShowCreateForm(false);
  };

  const handleClear = () => {
    setForm({ date: "", startTime: "", endTime: "", classId: 0, subjectId: 0, teacherId: 0 });
    dispatch(clearError());
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Gestion des Sessions
              </h1>
              <p className="text-gray-600 mt-2">Planifiez et organisez les sessions de cours</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-sky-500 transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouvelle Session
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
                Créer une nouvelle session
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heure de début</label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heure de fin</label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Classe</label>
                <input
                  type="number"
                  name="classId"
                  value={form.classId || ""}
                  onChange={handleChange}
                  placeholder="Entrez l'ID de la classe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Matière</label>
                <input
                  type="number"
                  name="subjectId"
                  value={form.subjectId || ""}
                  onChange={handleChange}
                  placeholder="Entrez l'ID de la matière"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Enseignant</label>
                <input
                  type="number"
                  name="teacherId"
                  value={form.teacherId || ""}
                  onChange={handleChange}
                  placeholder="Entrez l'ID de l'enseignant"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-sky-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-sky-500 transition-all"
              >
                Créer la session
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  handleClear();
                }}
                className="px-6 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Sessions Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-yellow-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Liste des sessions
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-4">
                <svg className="animate-spin h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 font-medium">Chargement des sessions...</p>
              </div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
              <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-semibold mb-2">Aucune session pour le moment</p>
              <p className="text-sm">Créez votre première session pour commencer</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-100 to-yellow-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Horaire</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Classe</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Matière</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Enseignant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 bg-gradient-to-br from-sky-100 to-yellow-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <span className="font-semibold text-gray-800">
                            {new Date(session.date).toLocaleDateString('fr-FR', { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                          {session.startTime} - {session.endTime}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {session.class?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {session.subject?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          {session.teacher?.name}
                        </span>
                      </td>
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

export default Sessions;