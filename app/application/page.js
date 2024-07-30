"use client";

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardItem from "../components/card/CardItem"; 

const ApplicationPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fake data for testing purposes
    const fakeData = [
      {
        name: "Plugin One",
        package_type: "v2",
        delayTime: 0.2,
        download: 100,
        published_at: "2023-01-01",
        version: "1.0.0",
        description: "This is a description for Plugin One.",
        zipball_url: "http://example.com/plugin-one.zip",
      },
      {
        name: "Plugin Two",
        package_type: "v1",
        delayTime: 0.3,
        download: 200,
        published_at: "2023-02-01",
        version: "2.0.0",
        description: "This is a description for Plugin Two.",
        zipball_url: "",
      },
      {
        name: "Plugin Three",
        package_type: "v2",
        delayTime: 0.4,
        download: 150,
        published_at: "2023-03-01",
        version: "1.2.0",
        description: "This is a description for Plugin Three.",
        zipball_url: "http://example.com/plugin-three.zip",
      },
      {
        name: "Plugin Four",
        package_type: "v1",
        delayTime: 0.5,
        download: 250,
        published_at: "2023-04-01",
        version: "3.0.0",
        description: "This is a description for Plugin Four.",
        zipball_url: "",
      },
      // Add more items as needed
    ];

    // Simulate data fetching
    setTimeout(() => {
      setData(fakeData);
    }, 1000); // Simulate a network delay
  }, []);

  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (criteria) => {
    const sorted = [...data].sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      }
      if (criteria === "download") {
        return b.download - a.download;
      }
      if (criteria === "date") {
        return new Date(b.published_at) - new Date(a.published_at);
      }
      return 0;
    });
    setSortedData(sorted);
  };

  return (
    <div>
      <Header />

      {/* Banner start */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <h2 className="breadd wow fadeInUp">应用 </h2>
            <ul className="breadcrumb-list wow fadeInUp">
              <li>
                <a href="/">首页 /</a>
              </li>
              <li>应用</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Banner end */}

      {/* Main Content Section */}
      <section className="main-content-section">
        <div className="container mx-auto flex flex-wrap py-12">
          {/* Left Section */}
          <div className="w-full md:w-7/12 lg:w-8/12">
            <div className="row">
              {sortedData.map((item, index) => (
                <CardItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-5/12 lg:w-4/12 pl-4">
            <div className="sorting-section bg-white p-4 rounded shadow">
              <h4 className="mb-4">分类</h4>
              <div className="btn-group-vertical w-full">
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => handleSort("name")}
                >
                  按名称排序
                </button>
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => handleSort("download")}
                >
                  按下载量排序
                </button>
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => handleSort("date")}
                >
                  按发布时间排序
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplicationPage;
