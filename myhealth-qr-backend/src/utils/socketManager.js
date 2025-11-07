// Socket.io instance holder
let io = null;

export const setSocketIO = (socketInstance) => {
  io = socketInstance;
};

export const getSocketIO = () => {
  if (!io) {
    console.warn('⚠️  Socket.IO non initialisé');
  }
  return io;
};

export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user_${userId}`).emit(event, data);
  } else {
    console.warn('⚠️  Impossible d\'émettre l\'événement: Socket.IO non initialisé');
  }
};
