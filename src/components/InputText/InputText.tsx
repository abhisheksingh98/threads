import { useState } from "react";
import Modal from "../../ui-lib/Modal";
import LoginSignUpScreen from "../../screens/LoginSignUpScreen";
import TextArea from "../../ui-lib/TextArea";
import EmojiPicker from "emoji-picker-react";

interface EmojiClickData {
  emoji: string;
}

const TextInput = ({ placeholder }: { placeholder: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("💬");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // const handleCreatePost = useCallback(() => {
  //   if (!user) {
  //     setIsModalOpen(true);
  //     return;
  //   }
  //   if (!inputValue.trim()) return;
  //   const newPost = new ThreadModel(
  //     user,
  //     DateTime.now().toJSDate(),
  //     selectedEmoji,
  //     inputValue
  //   );
  //   onSubmit(newPost);
  //   setInputValue("");
  //   setSelectedEmoji("💬");
  // }, [user, inputValue, selectedEmoji, onSubmit]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emojiObject: EmojiClickData) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <div className="py-7 px-5 w-[700px] rounded-lg shadow-md bg-input-border-primary">
        <div className="flex p-4 mb-4 space-x-5 rounded-lg text-text-content bg-background-black-tint">
          <div className="relative flex w-full">
            <div className="flex items-center justify-center rounded-full bg-background-primary w-11 h-11 shrink-0 grow-0">
              <button
                className="focus:outline-none"
                onClick={toggleEmojiPicker}
              >
                {selectedEmoji || "💬"}
              </button>
            </div>
            <TextArea
              value={inputValue}
              onChange={handleInputChange}
              textAreaProps={{
                placeholder,
                className:
                  "w-full px-4 py-2 bg-transparent rounded-lg outline-none",
              }}
            />
            {showEmojiPicker && (
              <div className="absolute left-[-15px] z-10 top-[60px]">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end text-right">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[111px] h-[43px] mt-4 text-white bg-blue-500 rounded"
          >
            Post
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginSignUpScreen />
      </Modal>
    </>
  );
};

export default TextInput;
