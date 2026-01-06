import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import {
  fetchAttendanceBySession,
  createAttendance,
  clearAttendance,
  clearAttendanceError,
  type AttendanceStatus,
} from "../../features/attendanceSlice";

interface AttendanceManagementProps {
  sessionId: number;
}

const AttendanceManagement: React.FC<AttendanceManagementProps> = ({ sessionId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendances, loading, error } = useSelector(
    (state: RootState) => state.attendance
  );

  const [localAttendances, setLocalAttendances] = useState<
    Record<number, AttendanceStatus>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log("sessionId utilisé :", sessionId);
    dispatch(fetchAttendanceBySession(sessionId));
  }, [sessionId]);

  useEffect(() => {
    if (attendances.length > 0) {
      const attendanceMap: Record<number, AttendanceStatus> = {};
      attendances.forEach((att) => {
        attendanceMap[att.studentId] = att.status;
      });
      setLocalAttendances(attendanceMap);
    }
  }, [attendances]);

  const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
    setLocalAttendances((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    const attendancesArray = Object.entries(localAttendances).map(
      ([studentId, status]) => ({
        studentId: Number(studentId),
        status,
      })
    );

    try {
      await dispatch(
        createAttendance({
          sessionId,
          attendances: attendancesArray,
        })
      ).unwrap();
      
      alert("Présences enregistrées avec succès !");
      
      // Recharger les présences après sauvegarde
      dispatch(fetchAttendanceBySession(sessionId));
    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-700";
      case "ABSENT":
        return "bg-red-100 text-red-700";
      case "LATE":
        return "bg-yellow-100 text-yellow-700";
      case "EXCUSED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: AttendanceStatus) => {
    switch (status) {
      case "PRESENT":
        return "Présent";
      case "ABSENT":
        return "Absent";
      case "LATE":
        return "Retard";
      case "EXCUSED":
        return "Excusé";
      default:
        return status;
    }
  };

  console.log("hire", attendances);

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </span>
                Gestion des Présences
              </h1>
              {attendances.length > 0 && attendances[0].session && (
                <p className="text-gray-600 mt-2">
                  Session du {new Date(attendances[0].session.date).toLocaleDateString("fr-FR", { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                  {attendances[0].session.class && ` • ${attendances[0].session.class.name}`}
                  {attendances[0].session.subject && ` • ${attendances[0].session.subject.name}`}
                </p>
              )}
            </div>
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
              <button onClick={() => dispatch(clearAttendanceError())} className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        {attendances.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {(["PRESENT", "ABSENT", "LATE", "EXCUSED"] as AttendanceStatus[]).map(
              (status) => {
                const count = Object.values(localAttendances).filter(
                  (s) => s === status
                ).length;
                const percentage = attendances.length > 0
                  ? ((count / attendances.length) * 100).toFixed(0)
                  : "0";
                
                const iconMap = {
                  PRESENT: "M5 13l4 4L19 7",
                  ABSENT: "M6 18L18 6M6 6l12 12",
                  LATE: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  EXCUSED: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                };

                const gradientMap = {
                  PRESENT: "from-green-400 to-green-300",
                  ABSENT: "from-red-400 to-red-300",
                  LATE: "from-yellow-400 to-yellow-300",
                  EXCUSED: "from-blue-400 to-blue-300"
                };

                return (
                  <div key={status} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">
                          {getStatusLabel(status)}
                        </p>
                        <p className="text-3xl font-bold text-gray-800">{count}</p>
                        <p className="text-sm text-gray-600 mt-1">{percentage}%</p>
                      </div>
                      <div className={`w-14 h-14 bg-gradient-to-br ${gradientMap[status]} rounded-xl flex items-center justify-center shadow-lg`}>
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconMap[status]} />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-yellow-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Liste des étudiants
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-4">
                <svg className="animate-spin h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 font-medium">Chargement des présences...</p>
              </div>
            </div>
          ) : attendances.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
              <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-lg font-semibold mb-2">Aucune présence</p>
              <p className="text-sm">Aucun élève trouvé pour cette session</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-100 to-yellow-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Étudiant</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Statut actuel</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Modifier le statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendances.map((attendance, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-yellow-400 flex items-center justify-center text-white font-bold shadow-md">
                            {attendance.student?.firstName?.[0]}
                            {attendance.student?.lastName?.[0]}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {attendance.student?.firstName} {attendance.student?.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">#{attendance.student?.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            localAttendances[attendance.studentId] || attendance.status
                          )}`}
                        >
                          {getStatusLabel(
                            localAttendances[attendance.studentId] || attendance.status
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <select
                            value={localAttendances[attendance.studentId] || attendance.status}
                            onChange={(e) =>
                              handleStatusChange(
                                attendance.studentId,
                                e.target.value as AttendanceStatus
                              )
                            }
                            className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-sm font-medium"
                          >
                            <option value="PRESENT">Présent</option>
                            <option value="ABSENT">Absent</option>
                            <option value="LATE">Retard</option>
                            <option value="EXCUSED">Excusé</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Actions */}
          {attendances.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => dispatch(fetchAttendanceBySession(sessionId))}
                disabled={loading}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-sky-500 transition-all disabled:opacity-50"
              >
                {isSaving ? "Enregistrement..." : "Enregistrer les présences"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;