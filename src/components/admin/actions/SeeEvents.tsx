import React, { useState } from "react";
import SideBar from "../layout/SideBar";
import SeeGeneralEvent from "../operations/SeeGeneralEvent";

const SeeEvents: React.FC = () => {
    const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />

                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 my-1"><span className="text-muted fw-light">Events /</span> All Event</h4>
                        <div className="button-container mb-4">
                            <button className='btn btn-primary' onClick={() => setVisibleDiv(1)}>General Event</button>
                            <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(2)}>Sports and Match</button>
                            <button className='btn btn-primary' onClick={() => setVisibleDiv(3)}>Other Events</button>
                            <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(4)}>Theater and Movie</button>
                        </div>

                        <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                            <SeeGeneralEvent />
                        </div>
                        <div className={visibleDiv === 2 ? "visible" : "hidden"}>
                            Div 2
                        </div>
                        <div className={visibleDiv === 3 ? "visible" : "hidden"}>
                            Div 3
                        </div>
                        <div className={visibleDiv === 4 ? "visible" : "hidden"}>
                            Div 4
                        </div>

                    </div>
                    <div className="content-backdrop fade"></div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default SeeEvents;
