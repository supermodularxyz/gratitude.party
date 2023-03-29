import { gradient } from "./Button";

export const Spinner = ({ className = "" }) => (
  <div
    className={`relative h-32 w-32 animate-spin rounded-full bg-gradient-to-b ${gradient}`}
  >
    <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
  </div>
);
