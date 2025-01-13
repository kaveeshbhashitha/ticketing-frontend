import React, { useState } from 'react';
import SideBar from './../layout/SideBar';
import '../../../styles/adminEvents.css';
import Footer from '../../layout/Footer';
import DeleteEvent from './DeleteEvent';
import UpdateEvent from './UpdateEvent';

const UpdateAndDeleteEvent: React.FC = () => {
  const [visibleDiv, setVisibleDiv] = useState<number>(1);

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 my-1">
                <span className="text-muted fw-light">Events /</span> Update and Delete
              </h4>
              <div className="button-container mb-4">
                <button className="btn btn-primary" onClick={() => setVisibleDiv(1)}>
                  Update Event
                </button>
                <button className="btn btn-primary mx-2" onClick={() => setVisibleDiv(2)}>
                  Delete Event
                </button>
              </div>

              <div className={visibleDiv === 1 ? 'visible' : 'hidden'}>
              <UpdateEvent/>
              </div>

              <div className={visibleDiv === 2 ? 'visible' : 'hidden'}>
              <DeleteEvent />
              </div>
            </div>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateAndDeleteEvent;
