import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalMenu from './components/HorizontalMenu';
import MainGrid from './components/MainGrid';
import { socket } from './socket';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents((previous: any): any => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    }
  })

  return (
    <div className="App">
      <HorizontalMenu />
      <MainGrid  />
    </div>
  );
}

export default App;