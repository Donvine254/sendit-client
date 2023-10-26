// in config.js
import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture";
import Image from "next/image";

const botName = "Donvine";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. I will be your assistant today.`),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#0056f1",
    },
    chatButton: {
      backgroundColor: "#22C55E",
    },
  },
  widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
  customComponents: {
    botAvatar: (props) => (
      <Image
        src="https://avatars.githubusercontent.com/u/126117678?s=60&v=4"
        height={48}
        width={48}
        alt="donvine"
        className="!rounded-full !ring-2 !ring-blue-800 !ring-offset-base-100 !ring-offset-2 !h-12 !w-12"
        {...props}
      />
    ),
  },
};

export default config;
