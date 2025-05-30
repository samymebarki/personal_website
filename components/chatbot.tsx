// components/ChatbaseScript.tsx
import { useEffect } from 'react';

declare global {
  interface Window {
    chatbase?: any;
  }
}

const ChatbaseScript: React.FC = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (!window.chatbase || window.chatbase("getState") !== "initialized")
    ) {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args: any[]) => target(prop, ...args);
        },
      });

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "qAySb5Rk3DfLgo9pZc7Jt"; // Replace with your actual ID if different
      (script as any).domain = "www.chatbase.co";
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default ChatbaseScript;
