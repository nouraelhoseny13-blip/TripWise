import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-text/30 px-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-[24px] border border-primary/10 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-text/50 transition hover:bg-soft-pink hover:text-primary"
        >
          <X size={20} />
        </button>

        {title && (
          <h2 className="pr-10 font-heading text-2xl font-bold text-text">
            {title}
          </h2>
        )}

        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;