import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [availablePlaces, setAvailablePlaces] = useState<number[]>([]);
  const [assignedSpot, setAssignedSpot] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    fetchAvailablePlaces();
  }, []);

  const fetchAvailablePlaces = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tickets');
      const tickets = response.data;
      const availablePlaces = tickets.map((ticket: any) => ticket.placeNumber);
      setAvailablePlaces(availablePlaces);
    } catch (error) {
      console.error('Error while fetching available places:', error);
    }
  };

  const handleSpotClick = async (index: number) => {
    const spotNumber = index + 1;
    try {
      const response = await axios.delete(`http://localhost:3001/api/tickets/${spotNumber}`);
      const { availablePlaces } = response.data;

      setAvailablePlaces(availablePlaces);
      setModalContent(`Place numéro ${spotNumber} a été libérée`);
      setShowModal(true);
    } catch (error) {
      console.error('Error while releasing spot:', error);
    }
  };

  const handleDistributeTicket = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/ticket');
      const { placeNumber } = response.data;

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setModalContent(`Bienvenue au parking\n\nL'heure d'entrée est ${timestamp}\n\n\n\n\n\n\nVotre numéro de place est :\n\n ${placeNumber}`);
      setShowModal(true);
      setAssignedSpot(placeNumber);

      setAvailablePlaces(prevPlaces => [...prevPlaces, placeNumber]);
    } catch (error) {
      console.error('Error while generating ticket:', error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.delete('http://localhost:3001/api/reset');
      alert('Parking app mis à zéro');
      setAvailablePlaces([]);
      setAssignedSpot(null);
    } catch (error) {
      console.error('Error while resetting parking app:', error);
    }
  };

  const renderParkingSpots = () => {
    const parkingSpots = [];
    const totalSpots = 20;
    const remainingPlaces = totalSpots - availablePlaces.length;

    for (let i = 0; i < totalSpots; i++) {
      const spotNumber = i + 1;
      const isOccupied = availablePlaces.includes(spotNumber);
      const isSelected = spotNumber === assignedSpot;
      const spotClassName = isOccupied
        ? 'parking-spot occupied'
        : isSelected
        ? 'parking-spot selected'
        : 'parking-spot empty';

      parkingSpots.push(
        <div key={i} className={spotClassName} onClick={() => handleSpotClick(i)}>
          <span className="spot-number">{spotNumber}</span>
        </div>
      );
    }
    return parkingSpots;
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  return (
    <div className="App">
      <div className="content-wrapper">
        <h1>Parking App</h1>
        <div className="parking-grid-container">
          <div className="parking-grid">{renderParkingSpots()}</div>
        </div>
        <h4>- cliquer sur la place pour la libérer -</h4>
        <div className="parking-info">Places disponibles: {20 - availablePlaces.length}</div>
        <button onClick={handleDistributeTicket}>Ticket</button>
        {assignedSpot && (
          <div className="assignedPlace">La dernière place assignée était le : {assignedSpot}</div>
        )}
      </div>

      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <pre>{modalContent}</pre>
            <button className="close-button" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
