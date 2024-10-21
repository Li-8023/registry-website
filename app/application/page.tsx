"use client";

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardItem from "../components/card/CardItem";

interface Category {
  id: string;
  name: string;
}

interface Provider {
  id: string;
  name: string;
}

interface Package {
  name: string;
  download: number;
  latest_create: string;
  description?: string;
  zipball_url?: string;
}

const ApplicationPage: React.FC = () => {
  const [data, setData] = useState<Package[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [sortedData, setSortedData] = useState<Package[]>([]);

  useEffect(() => {
    // Fetch categories and providers
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/common/categories",
          {
            headers: {
              lang: "zh",
            },
          }
        );
        const result = await response.json();
        setCategories(result.body);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/common/providers",
          {
            headers: {
              lang: "zh",
            },
          }
        );
        const result = await response.json();
        setProviders(result.body);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/releases?type=3",
          {
            headers: {
              lang: "zh",
            },
          }
        );
        const result = await response.json();
        setData(result.body);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
    fetchProviders();
    fetchData();
  }, []);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (criteria: string) => {
    const sorted = [...data].sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      }
      if (criteria === "download") {
        return b.download - a.download;
      }
      if (criteria === "date") {
        return new Date(b.latest_create).getTime() - new Date(a.latest_create).getTime();
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
            <h2 className="breadd wow fadeInUp">应用</h2>
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
          {/* Right Section (now moved to left) */}
          <div className="w-full md:w-5/12 lg:w-4/12 pr-4">
            <div className="sorting-section bg-white p-4 rounded shadow">
              <h4 className="mb-4">分类</h4>
              <div className="btn-group-vertical w-full">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="btn btn-outline-primary mb-2"
                  >
                    {category.name}
                  </button>
                ))}
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

            <div className="sorting-section bg-white p-4 rounded shadow mt-4">
              <h4 className="mb-4">云厂商</h4>
              <div className="btn-group-vertical w-full">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    className="btn btn-outline-primary mb-2"
                  >
                    {provider.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Left Section (now moved to right) */}
          <div className="w-full md:w-7/12 lg:w-8/12">
            <div className="row">
              {sortedData.map((item, index) => (
                <CardItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplicationPage;
