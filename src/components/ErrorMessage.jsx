import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="rounded-[24px] border border-primary/10 bg-white p-8 text-center shadow-sm transition-colors duration-300 dark:bg-white sm:p-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soft-pink text-primary"
      >
        <AlertCircle size={30} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.2,
        }}
        className="mt-5 font-heading text-2xl font-bold text-text"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
        }}
        className="mx-auto mt-3 max-w-md text-sm leading-6 text-text/60"
      >
        {message}
      </motion.p>

      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
        >
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ErrorMessage;
