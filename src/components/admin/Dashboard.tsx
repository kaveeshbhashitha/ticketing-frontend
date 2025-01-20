import React, { useEffect, useState } from "react";
import SideBar from "./layout/SideBar";
import CongratulationsCard from "./layout/CongratulationsCard";
import useAuthCheck from "../../useAuthCheck";
import { getUserByEmail } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { logout } from "../../service/AuthService";
import HeaderDasboard from "../layout/HeaderDashboard";
import Footer from "../layout/Footer";

interface User {
  userEmail: string;
  firstName: string;
  lastName: string;
}

const Dashboard: React.FC = () => {
  useAuthCheck(['Admin']);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  
  const userEmail = sessionStorage.getItem('user')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userEmail) {
          setError("No email found in session storage.");
          return;
        }

        const fetchedUser = await getUserByEmail(userEmail);

        if (fetchedUser) {
          setUser(fetchedUser);
          setError("");
        } else {
          setError("No user found for the given email.");
        }
      } catch (error) {
        setError("Error fetching user data.");
        console.error("Failed to fetch user:", error, userEmail);
      }
    };

    fetchUser();
  }, [userEmail]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
};


  return (
    <div>
      <HeaderDasboard/>
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        <div className="layout-page">
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="/">
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0"></i>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button" onClick={handleLogout}>
                      <span className="fw-semibold d-block">
                        <abbr title="Click here to logout">
                          <div>
                            {error && <p>{error}</p>}
                            {user && (
                              <div>
                                {user.firstName.toUpperCase()}{" "}
                                {user.lastName.toUpperCase()}
                              </div>
                            )}
                          </div>
                        </abbr>
                      </span>
                  </a>
                </li>
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a className="nav-link dropdown-toggle hide-arrow" href="/" data-bs-toggle="dropdown">
                   
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="/">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block"></span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                          <span className="flex-grow-1 align-middle">Billing</span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                  <div className="card">
                    <div className="d-flex align-items-end row">
                      <div className="col-sm-7">
                        <div className="card-body">
                        <CongratulationsCard/>
                        </div>
                      </div>
                      <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                          <img
                            src="../assets/img/illustrations/man-with-laptop-light.png"
                            height="140"
                            alt="View Badge User"
                            data-app-dark-img="illustrations/man-with-laptop-dark.png"
                            data-app-light-img="illustrations/man-with-laptop-light.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 order-1">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/chart-success.png"
                                alt="chart success"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt3"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                <a className="dropdown-item" href="/">View More</a>
                                <a className="dropdown-item" href="/">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Total Income</span>
                          <h4 className="card-title mb-2">TotolIncome</h4>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                <a className="dropdown-item" href="/">View More</a>
                                <a className="dropdown-item" href="/">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span>Today Income</span>
                          <h4 className="card-title text-nowrap mb-1">TodayIncome</h4>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                  <div className="card">
                    <div className="row row-bordered g-0">
                      <div className="col-md-8">
                        <h5 className="card-header">Total Income</h5>
                        DailyIncomeChart 
                      </div>
                      <div className="col-md-4">
                        <div className="card-body">
                          <div className="text-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-primary dropdown-toggle"
                                type="button"
                                id="growthReportId"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                2022
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="growthReportId">
                                <a className="dropdown-item" href="/">2021</a>
                                <a className="dropdown-item" href="/">2020</a>
                                <a className="dropdown-item" href="/">2019</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="growthChart"></div>
                        <div className="text-center fw-semibold pt-3 mb-2">62% Company Growth</div>

                        <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                          <div className="d-flex">
                            <div className="me-2">
                              <span className="badge bg-label-primary p-2"><i className="bx bx-dollar text-primary"></i></span>
                            </div>
                            <div className="d-flex flex-column">
                              <small>2022</small>
                              <h6 className="mb-0">RS.12000</h6>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="me-2">
                              <span className="badge bg-label-info p-2"><i className="bx bx-wallet text-info"></i></span>
                            </div>
                            <div className="d-flex flex-column">
                              <small>2021</small>
                              <h6 className="mb-0">RS.25,000</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div>
                    <div className="row mt-3">
                      <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                        <div className="card h-100">
                          <div className="card-header d-flex align-items-center justify-content-between pb-0">
                            <div className="card-title mb-0">
                              <h5 className="m-0 me-2">Order Statistics</h5>
                              <small className="text-muted">RS.42,982 Total Sales</small>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="orederStatistics"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics">
                                <a className="dropdown-item" href="/">Select All</a>
                                <a className="dropdown-item" href="/">Refresh</a>
                                <a className="dropdown-item" href="/">Share</a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              {/* <div id="orderStatisticsChart"><PieChart/> </div> */}
                            </div>
                            <ul className="p-0 m-0">
                              <li className="d-flex mb-4 pb-1">
                                <div className="avatar flex-shrink-0 me-3">
                                  <span className="avatar-initial rounded bg-label-primary"
                                    ><i className="bx bx-mobile-alt"></i
                                  ></span>
                                </div>
                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                  <div className="me-2">
                                    <h6 className="mb-0">Electronic</h6>
                                    <small className="text-muted">Mobile, Earbuds, TV</small>
                                  </div>
                                  <div className="user-progress">
                                    <small className="fw-semibold">82.5k</small>
                                  </div>
                                </div>
                              </li>
                              <li className="d-flex mb-4 pb-1">
                                <div className="avatar flex-shrink-0 me-3">
                                  <span className="avatar-initial rounded bg-label-success"><i className="bx bx-closet"></i></span>
                                </div>
                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                  <div className="me-2">
                                    <h6 className="mb-0">Fashion</h6>
                                    <small className="text-muted">T-shirt, Jeans, Shoes</small>
                                  </div>
                                  <div className="user-progress">
                                    <small className="fw-semibold">23.8k</small>
                                  </div>
                                </div>
                              </li>
                              <li className="d-flex mb-4 pb-1">
                                <div className="avatar flex-shrink-0 me-3">
                                  <span className="avatar-initial rounded bg-label-info"><i className="bx bx-home-alt"></i></span>
                                </div>
                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                  <div className="me-2">
                                    <h6 className="mb-0">Decor</h6>
                                    <small className="text-muted">Fine Art, Dining</small>
                                  </div>
                                  <div className="user-progress">
                                    <small className="fw-semibold">849k</small>
                                  </div>
                                </div>
                              </li>
                              <li className="d-flex">
                                <div className="avatar flex-shrink-0 me-3">
                                  <span className="avatar-initial rounded bg-label-secondary"
                                    ><i className="bx bx-football"></i
                                  ></span>
                                </div>
                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                  <div className="me-2">
                                    <h6 className="mb-0">Sports</h6>
                                    <small className="text-muted">Football, Cricket Kit</small>
                                  </div>
                                  <div className="user-progress">
                                    <small className="fw-semibold">99</small>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 order-1 mb-4">
                        <div className="card h-100">
                          <div className="card-header">
                            <ul className="nav nav-pills" role="tablist">
                              <li className="nav-item">
                                <button
                                  type="button"
                                  className="nav-link active"
                                  role="tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#navs-tabs-line-card-income"
                                  aria-controls="navs-tabs-line-card-income"
                                  aria-selected="true"
                                >
                                  Income
                                </button>
                              </li>
                              <li className="nav-item">
                                <button type="button" className="nav-link" role="tab">Expenses</button>
                              </li>
                              <li className="nav-item">
                                <button type="button" className="nav-link" role="tab">Profit</button>
                              </li>
                            </ul>
                          </div>
                          <div className="card-body px-0">
                            <div className="tab-content p-0">
                              <div className="tab-pane fade show active" id="navs-tabs-line-card-income" role="tabpanel">
                                <div className="d-flex p-4 pt-3">
                                  <div className="avatar flex-shrink-0 me-3">
                                    <img src="../assets/img/icons/unicons/wallet.png" alt="User" />
                                  </div>
                                  <div>
                                    <small className="text-muted d-block">Total Balance</small>
                                    <div className="d-flex align-items-center">
                                      <h6 className="mb-0 me-1">RS.45,910</h6>
                                      <small className="text-success fw-semibold">
                                        <i className="bx bx-chevron-up"></i>
                                        42.9%
                                      </small>
                                    </div>
                                  </div>
                                </div>
                                {/* <div id="incomeChart"><BarChart/></div> */}
                                <div className="d-flex justify-content-center pt-4 gap-2">
                                  <div className="flex-shrink-0">
                                    <div id="expensesOfWeek"></div>
                                  </div>
                                  <div>
                                    <p className="mb-n1 mt-1">Expenses This Week</p>
                                    <small className="text-muted">RS.3900 less than last week</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                  <div className="row">
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img src="../assets/img/icons/unicons/paypal.png" alt="Credit Card" className="rounded" />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt4"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                <a className="dropdown-item" href="/">View More</a>
                                <a className="dropdown-item" href="/">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="d-block mb-1">Total Ticket Sales</span>
                          <h3 className="card-title text-nowrap mb-2"> TotalTickets </h3>
                          <small className="text-danger fw-semibold"><i className="bx bx-down-arrow-alt"></i> -14.82%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img src="../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                <a className="dropdown-item" href="/">View More</a>
                                <a className="dropdown-item" href="/">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Today Ticket Sales</span>
                          <h3 className="card-title mb-2"> TodayTickets </h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.14%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                            <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                              <div className="card-title">
                                <h5 className="text-nowrap mb-2">Ticket Reservations</h5>
                                <span className="badge bg-label-warning rounded-pill">Year 2021</span>
                              </div>
                              <div className="mt-sm-auto">
                                <small className="text-success text-nowrap fw-semibold"
                                  ><i className="bx bx-chevron-up"></i> 68.2%</small>
                                <h5 className="mt-2">Number of Reservations: 00 totalReservations</h5>
                              </div>
                            </div>
                            <div id="profileReportChart"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  
                </div>
              </div>
            </footer>

            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    <Footer/>
    </div>
  );
};
export default Dashboard;