import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  [key: string]: string;
}

const NewEvent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("select");
  const [formData, setFormData] = useState<FormData>({});

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value);
    setFormData({});
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch("http://localhost:8080/your-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: selectedCategory, ...formData }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data submitted successfully!");
        } else {
          alert("Failed to submit data.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">

                  <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="eventName" className="form-label"> Event Name </label>
                        <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label"> Event Type </label>
                      <select id="category"  value={selectedCategory} onChange={handleCategoryChange} className="form-control" >
                        <option value="select">-- Select Event Type --</option>
                        <option value="generalEvent">General Event</option>
                        <option value="sports">Sports</option>
                        <option value="theater">Theater</option>
                        <option value="otherEvent">Other Events</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Rendering based on Category */}
        {selectedCategory === "generalEvent" && (
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-header">General Event Details</h5>
                {/* <div className="alert alert-success mx-2 d-flex justify-content-between">
                  <i className="fas fa-check-circle pt-1"></i>
                </div> */}
                <hr className="my-0" />
                <div className="card-body">
                  <div id="formAccountSettings">

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Event Name </label>
                            <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Event Name </label>
                            <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Event Name </label>
                            <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Event Name </label>
                            <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Event Name </label>
                            <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Event Name </label>
                            <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                        </div>
                    </div>

                  </div>
                </div>
              </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div id="formAccountSettings">

                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="eventName" className="form-label"> Upload Image </label>
                                        <input className="form-control" type="file" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {selectedCategory === "sports" && (
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Sports and Match</h5>
              {/* <div className="alert alert-success mx-2 d-flex justify-content-between">
                <i className="fas fa-check-circle pt-1"></i>
              </div> */}
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div id="formAccountSettings">

                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="eventName" className="form-label"> Upload Image </label>
                                    <input className="form-control" type="file" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        )}

        {selectedCategory === "theater" && (
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Theater and Drama</h5>
              {/* <div className="alert alert-success mx-2 d-flex justify-content-between">
                <i className="fas fa-check-circle pt-1"></i>
              </div> */}
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div id="formAccountSettings">

                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="eventName" className="form-label"> Upload Image </label>
                                    <input className="form-control" type="file" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        )}

        {selectedCategory === "otherEvent" && (
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Other Events and Activities</h5>
              {/* <div className="alert alert-success mx-2 d-flex justify-content-between">
                <i className="fas fa-check-circle pt-1"></i>
              </div> */}
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Name </label>
                          <input className="form-control" type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div id="formAccountSettings">

                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="eventName" className="form-label"> Upload Image </label>
                                    <input className="form-control" type="file" name="eventName" value={formData.eventName} onChange={handleInputChange} />
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        )}
        {/* Submit Button */}
        <div className="mt-2">
            <button type="submit" className="btn btn-primary me-2">
            Save changes
            </button>
            <button type="reset" className="btn btn-outline-secondary">
            Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
