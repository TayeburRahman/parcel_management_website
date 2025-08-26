import { io } from "socket.io-client";
import { baseUrl } from "@/redux/features/api/apiSlice";

const socket = io(baseUrl, {
  transports: ["websocket"],
});

export default socket;
