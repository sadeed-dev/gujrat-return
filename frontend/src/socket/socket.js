
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
// //   autoConnect: false, // optional: prevents connecting before auth, if needed
// });

// export default socket;// socket.js

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false, // ✅ ensures we control when it connects
});

export default socket;




