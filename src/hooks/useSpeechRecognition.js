import { useState } from "react";

const useSpeechRecognition = (onResult) => {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  };

  return { listening, startListening };
};

export default useSpeechRecognition;