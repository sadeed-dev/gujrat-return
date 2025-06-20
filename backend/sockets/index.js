// let io = null;
// const userSocketMap = new Map(); // userId (as string) -> socketId

// export const setIOInstance = (ioInstance) => {
//   io = ioInstance;
// };

// export const setupSocket = (ioInstance) => {
//   ioInstance.on('connection', (socket) => {
//     console.log('✅ User connected:', socket.id);

//     // socket.on('register', (user) => {
//     //   if (user && user._id && user.role) {
//     //     const userId = String(user._id); // Always store as string
//     //     userSocketMap.set(userId, socket.id);
//     //     socket.join(user.role);
//     //     console.log(`✅ User ${userId} registered and joined room: ${user.role}`);
//     //     console.log('📦 Current userSocketMap:', Array.from(userSocketMap.entries()));
//     //   } else {
//     //     console.warn('⚠️ Invalid user object in register event:', user);
//     //   }
//     // });
//     socket.on('login', (user) => {
//       const userId = String(user._id);
//       userSocketMap.set(userId, socket.id);  // Save the mapping
//       socket.join(user.role);                // Join role-based room
//       console.log(`User ${userId} logged in`);
//     });

//     socket.on('disconnect', () => {
//       for (const [userId, sockId] of userSocketMap.entries()) {
//         if (sockId === socket.id) {
//           userSocketMap.delete(userId);
//           console.log(`🔌 Disconnected: Removed userId ${userId} from userSocketMap`);
//           break;
//         }
//       }
//     });
//   });
// };


// // ✅ For broadcasting to all admins
// export const sendNotificationToAdmins = (notification) => {
//   if (!io) {
//     console.error('❌ io not initialized');
//     return;
//   }

//   console.log('📤 Sending notification to ADMIN:', notification);
//   io.to('ADMIN').emit('notification', notification);
// };

// // ✅ For targeted user notification
// export const sendNotificationToUser = (userId, notification) => {
//   if (!io) {
//     console.error('❌ io not initialized');
//     return;
//   }
  
//   const socketId = userSocketMap.get(String(userId)); // Always use string lookup
//   if (socketId) {
//     console.log(`📨 Sending notification to userId ${userId} (socketId: ${socketId})`);
//     io.to(socketId).emit('notification', notification);
//   } else {
//     console.warn(`⚠️ No socketId found for userId ${userId}`);
//     console.log('🔍 userSocketMap contents:', Array.from(userSocketMap.entries()));
//   }
// };



let io = null;
const userSocketMap = new Map(); // userId (as string) -> socketId

// ✅ Set the IO instance globally so it can be used in emit functions
export const setIOInstance = (ioInstance) => {
  io = ioInstance;
};

// ✅ Main socket setup function
export const setupSocket = (ioInstance) => {
  ioInstance.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // ✅ LOGIN event handler with validation & logging
    socket.on('login', (user) => {
      if (!user || !user._id || !user.role) {
        console.warn("⚠️ Received login with invalid user object:", user); // ✅ ADDED: Validation check
        return;
      }

      const userId = String(user._id); // Always use string type
      userSocketMap.set(userId, socket.id); // ✅ Save the mapping
      socket.join(user.role); // Join role-based room
      console.log(`✅ User ${userId} logged in with role ${user.role} and socketId ${socket.id}`); // ✅ ADDED detailed log
      console.log('📦 Current userSocketMap:', Array.from(userSocketMap.entries())); // ✅ Useful for debugging
    });

    // ✅ Disconnect handler to clean up user from the map
    socket.on('disconnect', () => {
      for (const [userId, sockId] of userSocketMap.entries()) {
        if (sockId === socket.id) {
          userSocketMap.delete(userId);
          console.log(`🔌 Disconnected: Removed userId ${userId} from userSocketMap`);
          break;
        }
      }
    });
  });
};

// ✅ Broadcast a notification to all users with the role "ADMIN"
export const sendNotificationToAdmins = (notification) => {
  if (!io) {
    console.error('❌ io not initialized');
    return;
  }

  console.log('📤 Sending notification to ADMIN:', notification);
  io.to('ADMIN').emit('notification', notification);
};

// ✅ Send a notification to a specific user by their userId
export const sendNotificationToUser = (userId, notification) => {
  if (!io) {
    console.error('❌ io not initialized');
    return;
  }

  const socketId = userSocketMap.get(String(userId)); // Always use string lookup
  if (socketId) {
    console.log(`📨 Sending notification to userId ${userId} (socketId: ${socketId})`);
    io.to(socketId).emit('notification', notification);
  } else {
    console.warn(`⚠️ No socketId found for userId ${userId}`);
  }
};
