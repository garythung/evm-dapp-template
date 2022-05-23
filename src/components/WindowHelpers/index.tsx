import React, { useEffect } from "react";

import { useToast } from "~/contexts/ToastContext";

// Injects a toast convenience object into the global window.
export default function WindowHelpers() {
  const toast = useToast();

  useEffect(() => {
    window.toast = toast;
  }, []);

  return <></>;
}
