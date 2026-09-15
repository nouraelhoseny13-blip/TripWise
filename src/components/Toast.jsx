import { Check, X } from "lucide-react";

function Toast({ message, type = "success", onClose }) {
  const isSuccess = type === "success";

  return (
    <div className="fixed right-6 top-24 z-[100] w-[calc(100%-3rem)] max-w-sm">
      <div
        className={`flex items-center gap-3 rounded-[14px] border bg-white px-4 py-3.5 shadow-xl ${
          isSuccess
            ? "border-green-200"
            : "border-red-200"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isSuccess ? (
            <Check size={18} />
          ) : (
            <X size={18} />
          )}
        </div>

        <p className="flex-1 text-sm font-medium text-text">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1.5 text-text/40 transition hover:bg-soft-pink hover:text-text"
          aria-label="Close notification"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

export default Toast;