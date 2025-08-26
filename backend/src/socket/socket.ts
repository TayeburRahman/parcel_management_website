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

    // Add the user to the online users set
    onlineUsers.add(currentUserId);
    io.emit("onlineUser", Array.from(onlineUsers));

    socket.on('update_parcel_status', async (data: { parcelId: string; status: string }) => {
      try {
        console.log(`[Socket] Received update_parcel_status for parcelId: ${data.parcelId}, status: ${data.status}`);
        const updatedParcel = await AgentService.updateParcelStatusByAgent(data.parcelId, data.status);

        socket.emit('update_parcel_status_success', { message: 'Status updated successfully' });
        console.log(`[Socket] Emitted update_parcel_status_success for parcelId: ${data.parcelId}`);

        io.emit('parcel_status_updated', updatedParcel);
        console.log(`[Socket] Broadcasted parcel_status_updated for parcelId: ${updatedParcel._id}`);

        if (updatedParcel && updatedParcel.customerId) {
          io.to(updatedParcel.customerId.toString()).emit('parcel_status_updated', updatedParcel);
          console.log(`[Socket] Emitted parcel_status_updated to customer ${updatedParcel.customerId} for parcelId: ${updatedParcel._id}`);
        }

      } catch (error) {
        console.error(`[Socket] Error updating parcel status for parcelId: ${data.parcelId}:`, error);
        socket.emit('update_parcel_status_error', { parcelId: data.parcelId, error: 'Failed to update status' });
      }
    });

    // New handler for agent location updates
    socket.on('agent_location_update', async (data: { agentId: string; location: { lat: number; lng: number } }) => {
      try {
        const { agentId, location } = data;
        console.log(`[Socket] Received agent_location_update from agent ${agentId} at lat: ${location.lat}, lng: ${location.lng}`);
        await AgentService.updateAgentLocation(agentId, location.lat, location.lng);
        console.log(`[Socket] Agent ${agentId} location updated in DB.`);
        io.emit('agent_location_updated', { agentId, location });
        console.log(`[Socket] Broadcasted agent_location_updated for agent ${agentId}.`);
      } catch (error) {
        console.error(`[Socket] Error updating agent location for agent ${data.agentId}:`, error);
        // Optionally emit an error back to the agent
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