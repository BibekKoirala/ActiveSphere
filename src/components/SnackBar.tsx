import { MouseEventHandler } from "react";

export const Snackbar = ({
  message,
  isVisible,
  success,
  onClose,
}: {
  success: boolean,
  message: string;
  isVisible: boolean;
  onClose: MouseEventHandler;
}) => {
  let mainClass = 'fixed bottom-5 right-5 bg-'+ (success?'blue':'red')+'-600 text-white px-4 py-2 rounded shadow-lg'
  return isVisible ? (
    <div className={mainClass}>
      {message}
      <button className="ml-4 text-white" onClick={onClose}>
        X
      </button>
    </div>
  ) : null;
};
