import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import statusCards from "../assets/JsonData/status-card-data.json";

const chartOptions = {
  series: [
    {
      name: "Secret",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Confidential",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const NewParticipants = {
  head: ["Role", "Name", "Designation"],
  body: [
    {
      userName: "Atif",
      Role: "Admin",
      Designation: "Admin",
    },
    {
      userName: "Sulman",
      Role: "Manager",
      Designation: "Manager",
    },
    {
      userName: "xyz",
      Role: "Admin",
      Designation: "CEO",
    },
    {
      userName: "Atif",
      Role: "Admin",
      Designation: "Admin",
    },
    {
      userName: "Sulman",
      Role: "Manager",
      Designation: "Visitor",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.userName}</td>
    <td>{item.Role}</td>
    <td>{item.Designation}</td>
  </tr>
);

const latestOrders = {
  header: ["Title", "Arthur", "date", "Category"],
  body: [
    {
      Title: "ABC",
      date: "17 Jun 2021",
      Arthur: "Admin",
      Category: "Beach",
    },
    {
      Title: "DEF",
      date: "1 Jun 2021",
      Arthur: "Admin",
      Category: "Attraction",
    },
    {
      Title: "GHI",
      date: "27 Jun 2021",
      Arthur: "Admin",
      Category: "Restaurant",
    },
    {
      Title: "GHI",
      date: "27 Jun 2021",
      Arthur: "Admin",
      Category: "Islands",
    },
    {
      Title: "GHI",
      date: "27 Jun 2021",
      Arthur: "Admin",
      Category: "Trending",
    },
  ],
};

const meetingStatus = {
  CONFIDENTIAL: "primary",
  SECRET: "warning",
  SENSITIVE: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.Title}</td>
    <td>{item.Arthur}</td>
    <td>{item.date}</td>
    <td>{item.Category}</td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>New Users</h3>
            </div>
            <div className="card__body">
              <Table
                headData={NewParticipants.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={NewParticipants.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>latest Blogs</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
