import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info as InfoIcon, X as CloseIcon } from "lucide-react"; // Assuming you're using Lucide Icons

function Alert() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="relative w-full rounded-lg border border-blue-500 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-white mb-3 bg-blue-500 dark:bg-background text-white"
          role="alert">
          <InfoIcon className="h-4 w-4" />
          <div>
            <h2 className="text-lg mb-1 font-bold leading-none tracking-tight">
              Understand Fraud
            </h2>
            <p className="text-gray-200 text-sm [&_p]:leading-relaxed xsm:text-xs">
              Learn how to identify fraud and design a strategy to prevent it to
              keep the business running!{" "}
              <a
                className="hover:text-blue-500 underline"
                href="https://docs.stripe.com/disputes/prevention"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="external">
                Click Here
              </a>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white dark:text-foreground hover:text-destructive"
            aria-label="Close alert">
            <CloseIcon className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Alert;
