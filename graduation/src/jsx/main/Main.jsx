import React, { useState } from "react";
import Header from '../common/Header.jsx';
import MapContainer from "./MapContainer";
import BottomSheet from './BottomSheet';

import Footer from '../common/Footer';

const Main = () => {

    const [selectedParking, setSelectedParking] = useState(null);


  return (
    <div className='main-container'>
      <Header />

        <MapContainer setSelectedParking={setSelectedParking} />
        {selectedParking && (
            <BottomSheet
                parking={selectedParking}
                onClose={() => setSelectedParking(null)}
            />
        )}

        <Footer />
    </div>
  );
};

export default Main;
