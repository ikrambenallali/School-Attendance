import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/photo1.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/40 via-blue-400/30 to-yellow-200/40"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-3xl">
          <div className="mb-8 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              <span className="text-yellow-200">School Attendance</span>{' '}
              {/* <span className="text-sky-200">Attendance</span> */}
            </h1>
            {/* <div className="h-1 w-32 bg-gradient-to-r from-yellow-300 to-sky-300 mx-auto rounded-full"></div> */}
          </div>

          <p className="text-xl md:text-2xl text-white  mb-12 drop-shadow-lg leading-relaxed font-bold">
            Simplifiez la gestion des présences et suivez l'assiduité de vos élèves en temps réel
          </p>

          <button
            onClick={() => navigate('/login')}
            className="group relative px-10 py-4 bg-gradient-to-r from-yellow-300 to-sky-300 text-gray-800 font-semibold text-lg rounded-full shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-105 hover:from-yellow-400 hover:to-sky-400"
          >
            <span className="relative z-10">Commencer</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>

          <div className="mt-16 flex justify-center gap-8 text-white/90">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-yellow-300/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Suivi en temps réel</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-sky-300/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Gestion simplifiée</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-yellow-300/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Rapports détaillés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
