import { Server, Socket } from 'socket.io';
import { ENUM_SOCKET_EVENT } from '../enums/user';
import { AgentService } from '../app/modules/agents/agents.service';

// Set to keep track of online users
const onlineUsers = new Set<string>();

const socket = (io: Server) => {
  io.on(ENUM_SOCKET_EVENT.CONNECT, async (socket: Socket) => {
    const currentUserId = socket.handshake.query.id as string;

    socket.join(currentUserId);
    console.log("A user connected", currentUserId);

    // Add the user to the online users set
    onlineUsers.add(currentUserId);
    io.emit("onlineUser", Array.from(onlineUsers));

    socket.on('update_parcel_status', async (data: { parcelId: string; status: string }) => {
      try {
        console.log("data.parcelId, data.status", data.parcelId, data.status)
        const updatedParcel = await AgentService.updateParcelStatusByAgent(data.parcelId, data.status);

        io.emit('parcel_status_updated', updatedParcel);

        if (updatedParcel && updatedParcel.customerId) {
          io.to(updatedParcel.customerId.toString()).emit('parcel_status_updated', updatedParcel);
        }

      } catch (error) {
        console.error('Error updating parcel status:', error);
        socket.emit('update_parcel_status_error', { parcelId: data.parcelId, error: 'Failed to update status' });
      }
    });


    socket.on("disconnect", () => {
      console.log("A user disconnected", currentUserId);
      onlineUsers.delete(currentUserId);
      io.emit("onlineUser", Array.from(onlineUsers));
    });
  });
};

// Export the socket initialization function
export default socket;
