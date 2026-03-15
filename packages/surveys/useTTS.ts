import { useEffect, useRef } from "react";

interface TTSOptions {
  questionText: string;
  answerOptions?: string[];
  enabled?: boolean;
}

export function useTTS({ questionText, answerOptions = [], enabled = true }: TTSOptions) {
  const synthRef = useRef(window.speechSynthesis);

  const speak = (text: string) => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.pitch = 1;
    utt.lang = "en-US";
    synthRef.current.speak(utt);
  };

  const playAll = () => {
    synthRef.current.cancel(); // clear queue
    speak(questionText);
    if (answerOptions.length > 0) {
      speak("Your options are: " + answerOptions.join(". "));
    }
  };

  const stop = () => synthRef.current.cancel();

  // Auto-play on question load
  useEffect(() => {
    if (!enabled) return;
    playAll();
    return () => synthRef.current.cancel(); // cleanup on unmount
  }, [questionText]); // re-fires on each new question

  return { playAll, stop };
}
