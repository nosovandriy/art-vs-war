import React from "react";

import "@styles/loading.scss";

function Loading({ className }: { className?: string }) {
  return (
    <div className={`wrapper ${className}`}>
      <span className="loader"></span>
    </div>
  );
}

export default Loading;
