import { Server, Socket } from 'socket.io';
import { ENUM_SOCKET_EVENT } from '../enums/user';
import { AgentService } from '../app/modules/agents/agents.service';

// Set to keep track of online users
const onlineUsers = new Set<string>();

const socket = (io: Server) => {
  io.on(ENUM_SOCKET_EVENT.CONNECT, async (socket: Socket) => {
    const currentUserId = socket.handshake.query.id as string;

    console.log(`[Socket] User connected: ${currentUserId}`);
    socket.join(currentUserId);

    onlineUsers.add(currentUserId);
    io.emit("onlineUser", Array.from(onlineUsers));

    socket.on('update_parcel_status', async (data: { parcelId: string; status: string }) => {
      try {
        const updatedParcel = await AgentService.updateParcelStatusByAgent(data.parcelId, data.status);

        socket.emit('update_parcel_status_success', { message: 'Status updated successfully' });

        io.emit('parcel_status_updated', updatedParcel);

        if (updatedParcel && updatedParcel.customerId) {
          io.to(updatedParcel.customerId.toString()).emit('parcel_status_updated', updatedParcel);
        }

      } catch (error) {
        socket.emit('update_parcel_status_error', { parcelId: data.parcelId, error: 'Failed to update status' });
      }
    });

    socket.on('agent_location_update', async (data: { agentId: string; location: { lat: number; lng: number } }) => {
      try {
        const { agentId, location } = data;
        console.log("===", agentId, location)
        await AgentService.updateAgentLocation(agentId, location.lat, location.lng);
        io.emit('agent_location_updated', { agentId, location });
      } catch (error) {
        socket.emit('agent_location_error', { error: 'Failed to update location' });
      }
    });


    socket.on("disconnect", () => {
      console.log(`[Socket] User disconnected: ${currentUserId}`);
      onlineUsers.delete(currentUserId);
      io.emit("onlineUser", Array.from(onlineUsers));
    });
  });
};

// Export the socket initialization function
export default socket;