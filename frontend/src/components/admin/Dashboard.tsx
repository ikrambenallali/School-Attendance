import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-yellow-500">School</span>{' '}
                  <span className="text-sky-500">Attendance</span>
                </h1>
                <p className="text-xs text-gray-500">Tableau de bord administrateur</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile & Logout */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">Admin</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-sky-400 text-white rounded-lg hover:from-yellow-500 hover:to-sky-500 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Bienvenue sur votre tableau de bord 👋
          </h2>
          <p className="text-gray-600">Voici un aperçu de votre école</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Élèves" 
            value={120} 
            icon="users"
            color="sky"
            trend="+5.2%"
          />
          <StatCard 
            title="Enseignants" 
            value={15} 
            icon="teacher"
            color="yellow"
            trend="+2 nouveaux"
          />
          <StatCard 
            title="Classes" 
            value={8} 
            icon="class"
            color="green"
            trend="Stable"
          />
          <StatCard 
            title="Matières" 
            value={20} 
            icon="book"
            color="purple"
            trend="+3 cette année"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard 
              label="Ajouter un élève"
              icon="user-add"
              color="sky"
            />
            <QuickActionCard 
              label="Créer une classe"
              icon="plus-circle"
              color="yellow"
            />
            <QuickActionCard 
              label="Gérer les absences"
              icon="calendar"
              color="green"
            />
            <QuickActionCard 
              label="Voir les rapports"
              icon="chart"
              color="purple"
            />
          </div>
        </div>

        {/* Recent Activity & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Activités récentes
            </h3>
            <div className="space-y-4">
              <ActivityItem 
                text="Nouvelle présence enregistrée - Classe A"
                time="Il y a 5 min"
                color="sky"
              />
              <ActivityItem 
                text="Prof. Dupont a ajouté une absence"
                time="Il y a 15 min"
                color="yellow"
              />
              <ActivityItem 
                text="3 nouveaux élèves inscrits"
                time="Il y a 1 heure"
                color="green"
              />
              <ActivityItem 
                text="Rapport mensuel généré"
                time="Il y a 2 heures"
                color="purple"
              />
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Présences aujourd'hui
            </h3>
            <div className="space-y-4">
              <AttendanceBar label="Présents" value={85} color="green" />
              <AttendanceBar label="Absents" value={10} color="red" />
              <AttendanceBar label="En retard" value={5} color="yellow" />
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-sky-50 to-yellow-50 rounded-xl border border-sky-100">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-sky-600">85%</span> de taux de présence aujourd'hui
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

/* --- Components --- */

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'sky' | 'yellow' | 'green' | 'purple';
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
  const colorClasses = {
    sky: 'from-sky-400 to-sky-300 text-sky-600 bg-sky-50',
    yellow: 'from-yellow-400 to-yellow-300 text-yellow-600 bg-yellow-50',
    green: 'from-green-400 to-green-300 text-green-600 bg-green-50',
    purple: 'from-purple-400 to-purple-300 text-purple-600 bg-purple-50',
  };

  const icons = {
    users: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    teacher: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
    class: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
    book: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[icon]}
          </svg>
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 ${colorClasses[color]} rounded-full`}>
            {trend}
          </span>
        )}
      </div>
      <h2 className="text-gray-500 text-sm font-semibold mb-1">{title}</h2>
      <p className="text-4xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

interface QuickActionCardProps {
  label: string;
  icon: string;
  color: 'sky' | 'yellow' | 'green' | 'purple';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ label, icon, color }) => {
  const colorClasses = {
    sky: 'border-sky-200 hover:bg-sky-50 text-sky-600',
    yellow: 'border-yellow-200 hover:bg-yellow-50 text-yellow-600',
    green: 'border-green-200 hover:bg-green-50 text-green-600',
    purple: 'border-purple-200 hover:bg-purple-50 text-purple-600',
  };

  const icons = {
    'user-add': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    ),
    'plus-circle': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    calendar: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    chart: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  };

  return (
    <button className={`p-4 border-2 ${colorClasses[color]} rounded-xl transition-all text-center group hover:scale-105`}>
      <svg className={`w-8 h-8 mx-auto mb-2 ${colorClasses[color]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{label}</span>
    </button>
  );
};

interface ActivityItemProps {
  text: string;
  time: string;
  color: 'sky' | 'yellow' | 'green' | 'purple';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ text, time, color }) => {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-2 h-2 rounded-full ${colorClasses[color]} mt-2 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 font-medium">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

interface AttendanceBarProps {
  label: string;
  value: number;
  color: 'green' | 'red' | 'yellow';
}

const AttendanceBar: React.FC<AttendanceBarProps> = ({ label, value, color }) => {
  const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-800">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};