import React, { useState, useEffect, Fragment } from "react";
import io from "socket.io-client";
const SocketClient = () => {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const serverConnect = () => {
    try {
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
      });
      socket.on("connect", () =>
        setMsg(`Is this client is connected? - ${socket.connected}`)
      );
      // send join message to server, pass a payload to it
      socket.emit("join", { name: "React Client", room: "room1" }, (err) => {});
    } catch (err) {
      setMsg("client connection failed");
    }
  };
  return (
    <Fragment>
      <div>{msg}</div>
    </Fragment>
  );
};
export default SocketClient;
