import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05020d] text-slate-200 font-sans overflow-hidden p-4 relative selection:bg-purple-500/30">
      
      {/* --- CREATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-100" />
      </div>

      <main className="w-full max-w-[460px] relative z-10">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
