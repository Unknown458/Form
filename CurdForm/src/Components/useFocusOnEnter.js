import { useEffect } from "react";

const useFocusOnEnter = (formRef, onSubmit) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isEnterKey = e.key === "Enter";
      const isSubmitButton = e.target.tagName === "BUTTON" && e.target.type === "submit";
      
      if (isEnterKey && isSubmitButton) {
        onSubmit();
      } else if (isEnterKey) {
        e.preventDefault();
        const form = formRef.current;
        const elements = Array.from(form.elements);
        const currentIndex = elements.indexOf(e.target);
        if (currentIndex >= 0 && currentIndex < elements.length - 1) {
          const nextElement = elements[currentIndex + 1];
          if (nextElement) nextElement.focus();
        }
      }
    };

    const formElement = formRef.current;
    formElement.addEventListener("keydown", handleKeyDown);

    return () => {
      formElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [formRef, onSubmit]);

  return { onEnterKey: () => {} };
};

export default useFocusOnEnter;
