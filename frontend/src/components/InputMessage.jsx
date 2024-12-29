import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { sendMessage } = useChatStore();

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      let base64image = reader.result;
      setPreviewImage(base64image);
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    await sendMessage({ text: text, image: previewImage });

    setText("");
    setPreviewImage("");
  };
  return (
    <div className="w-full h-auto px-4">
      {/* preview image box */}
      {previewImage && (
        <div className="size-40 border mb-2 relative overflow-hidden">
          <img src={previewImage} alt="" className="w-full object-cover" />
          <button
            onClick={() => setPreviewImage("")}
            className="size-8 rounded-full content-center bg-black text-white absolute top-1 right-1"
          >
            X
          </button>
        </div>
      )}
      <div className="w-full h-auto flex">
        <label
          htmlFor="chooseFile"
          className="size-12  content-center cursor-pointer text-center"
        >
          <FaRegImages size={25} />
        </label>
        <form
          onSubmit={handleSendMessage}
          className="w-full h-auto flex justify-between items-center "
        >
          <input
            type="file"
            id="chooseFile"
            className="hidden"
            onChange={handlePreviewImage}
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="w-full h-12 border px-4 rounded-full mx-2 bg-slate-100 outline-none"
          />
          <button type="submit" className="size-12 content-center">
            <RiSendPlaneFill size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputMessage;
