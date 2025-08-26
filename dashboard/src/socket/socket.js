import { io } from "socket.io-client";
import { baseUrl } from "@/redux/features/api/apiSlice";
import { getUserInfo } from "@/helper/SessionHelper";

const userInfo = getUserInfo();

const socket = io(baseUrl, {
  transports: ["websocket"],
  query: {
    id: userInfo?.userId,
  },
});

export default socket;