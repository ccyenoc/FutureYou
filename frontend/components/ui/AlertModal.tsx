import React from "react";

type AlertModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  variant?: "info" | "success" | "error";
};

export default function AlertModal({
  isOpen,
  title,
  message,
  onClose,
  variant = "info"
}: AlertModalProps) {
  if (!isOpen) return null;

  const headerColors = {
    info: "text-violet-400",
    success: "text-emerald-400",
    error: "text-rose-400"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f0f1b] border border-white/[0.08] rounded-[24px] max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
        {/* Top glow effect */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-violet-600/10 blur-2xl rounded-full" />
        
        <h3 className={`text-xl font-bold mb-2 relative z-10 ${headerColors[variant]}`}>
          {title}
        </h3>
        <p className="text-sm text-zinc-400 mb-6 relative z-10 leading-relaxed">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 px-4 py-2.5 font-semibold text-sm transition-all duration-200 text-white shadow-[0_4px_20px_rgba(109,40,217,0.25)] hover:shadow-[0_4px_25px_rgba(109,40,217,0.4)] active:scale-[0.98]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
