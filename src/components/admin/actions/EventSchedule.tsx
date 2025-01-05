import React from "react";
import SideBar from "../layout/SideBar";
import EventCalendar from "../operations/EventCalender";

const EventSchedule: React.FC = () => {
  return (
    <div>
        <div>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <SideBar />

                    <div className="content-wrapper" style={{overflow:'scroll'}}>
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <h4 className="fw-bold py-3 my-1"><span className="text-muted fw-light">Events /</span> Event Schedule</h4>
                            <div >
                                <EventCalendar height={"820"}/>
                            </div>
                        </div>
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default EventSchedule;