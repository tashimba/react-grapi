import { useEffect } from "react";
import axios from "axios";

const usePolling = (idInstance, apiToken, onNewMessage) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiToken}`
        );
        if (res.data?.body) {
          const { messageData } = res.data.body;
          if (messageData) {
            const text = messageData.textMessageData?.textMessage;
            if (text) {
              onNewMessage(text);
            }
          }
          await axios.delete(
            `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiToken}/${res.data.receiptId}`
          );
        }
      } catch (error) {
        console.error("Ошибка:", error.response?.data || error.message);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [idInstance, apiToken, onNewMessage]);
};

export default usePolling;
