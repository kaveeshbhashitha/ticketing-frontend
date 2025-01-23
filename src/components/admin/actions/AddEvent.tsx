import React from "react";
import SideBar from "../layout/SideBar";
import NewEvent from "../operations/NewEvent";
import useAuthCheck from "../../../useAuthCheck";
import ComponentDasboard from "../../layout/ComponetDashboard";
import Footer from "../../layout/Footer";

const AddEvent: React.FC = () => {
  useAuthCheck(['Admin']);

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <ComponentDasboard/>
            <div className="layout-container">
                <SideBar />

                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 my-1"><span className="text-muted fw-light">Events /</span> Add Event</h4>
                        <NewEvent/>
                    </div>
                </div>
            </div>
        </div><Footer/>
    </div>
  );
};
export default AddEvent;
