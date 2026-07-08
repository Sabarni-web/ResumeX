import React from 'react';
import { FiMic, FiSend } from 'react-icons/fi';

const AnswerInputBox = ({ value, onChange, onSubmit, isRecording, toggleRecording }) => {
  return (
    <div className="mt-6 border dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all">
      <textarea
        className="w-full p-4 min-h-[150px] resize-none bg-transparent outline-none text-slate-800 dark:text-slate-200"
        placeholder="Type your answer here or use the microphone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 flex justify-between items-center border-t dark:border-slate-700">
        <button 
          onClick={toggleRecording}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
        >
          <FiMic className="mr-2" />
          {isRecording ? 'Recording...' : 'Voice input'}
        </button>
        <button 
          onClick={onSubmit}
          className="flex items-center px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          Submit Answer <FiSend className="ml-2" />
        </button>
      </div>
    </div>
  );
};
export default AnswerInputBox;