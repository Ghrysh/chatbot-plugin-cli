import React, { useEffect } from 'react';

const FutureCloudChatbot = () => {
  useEffect(() => {
    if (!document.getElementById('fc-chatbot-script')) {
      const script = document.createElement('script');
      script.id = 'fc-chatbot-script';
      script.src = "https://api-chatbot.futurecloud.id/widget.js";
      script.setAttribute('data-license', '__LICENSE_KEY__');
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default FutureCloudChatbot;
