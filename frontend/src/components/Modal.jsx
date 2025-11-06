import React from 'react';

export default function Modal({ open, onClose, title, children }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg shadow-xl max-w-2xl w-full p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-600 dark:text-slate-300">&times;</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
