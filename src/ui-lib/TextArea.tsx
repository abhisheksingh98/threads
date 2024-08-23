import React, { useRef, useLayoutEffect } from "react";

const MIN_TEXTAREA_HEIGHT = 0;

const TextArea = ({
  value,
  onChange,
  textAreaProps,
}: {
  value: string;
  onChange?: (value: string) => void;
  textAreaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange?.(event.target.value);
  };

  useLayoutEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);

  return (
    <textarea
      {...textAreaProps}
      onChange={handleTextAreaChange}
      ref={textareaRef}
      style={{
        minHeight: MIN_TEXTAREA_HEIGHT,
        resize: "none",
      }}
      value={value}
    />
  );
};

export default TextArea;
