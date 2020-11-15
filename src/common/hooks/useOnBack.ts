import { useCallback } from "react";

export default function useOnBack() {
  return {
    onBack: useCallback(() => {
      window.history.back();
    }, []),
  };
}
