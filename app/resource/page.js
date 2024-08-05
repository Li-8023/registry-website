"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardItem from "../components/card/CardItem";

const ResourcePage = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [searchType, setSearchType] = useState(null); // Default to null
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

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

    fetchCategories();
    fetchProviders();
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
      fetchData("", "", null, search);
    } else {
      fetchData();
    }
  }, [searchParams]);

  const fetchData = async (
    category = "",
    provider = "",
    type = null,
    search = ""
  ) => {
    const url = new URL(
      "https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/releases"
    );
    const params = { lang: "zh", type, category, provider, search };

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(url, { headers: { lang: "zh" } });
      const result = await response.json();
      setData(result.body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        return new Date(b.latest_create) - new Date(a.latest_create);
      }
      return 0;
    });
    setSortedData(sorted);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    fetchData(
      selectedCategory,
      selectedProvider,
      searchType,
      event.target.value
    );
  };

  const handleSearchTypeChange = (event) => {
    const typeMap = {
      Component: "1",
      Plugin: "2",
      Project: "3",
      None: "",
    };
    const type = typeMap[event.target.value];
    setSearchType(type);
    fetchData(selectedCategory, selectedProvider, type, searchQuery);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchData(category, selectedProvider, searchType, searchQuery);
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    fetchData(selectedCategory, provider, searchType, searchQuery);
  };

  const filteredData = Array.isArray(sortedData)
    ? sortedData.filter(
        (item) =>
          item.name.includes(searchQuery) ||
          item.description.includes(searchQuery)
      )
    : [];

  return (
    <div>
      <Header />

      {/* Banner start */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <h2 className="breadd wow fadeInUp">搜索 </h2>
            <div className="search-section">
              <div className="radio-buttons flex justify-center mb-2">
                <label className="mr-4 text-white">
                  <input
                    type="radio"
                    value="Project"
                    checked={searchType === "3"}
                    onChange={handleSearchTypeChange}
                  />
                  应用
                </label>
                <label className="mr-4 text-white">
                  <input
                    type="radio"
                    value="Component"
                    checked={searchType === "1"}
                    onChange={handleSearchTypeChange}
                  />
                  组件
                </label>
                <label className="mr-4 text-white">
                  <input
                    type="radio"
                    value="Plugin"
                    checked={searchType === "2"}
                    onChange={handleSearchTypeChange}
                  />
                  插件
                </label>
                <label className="mr-4 text-white">
                  <input
                    type="radio"
                    value="None"
                    checked={searchType === ""}
                    onChange={handleSearchTypeChange}
                  />
                  无
                </label>
              </div>
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input w-full p-2 border rounded"
              />
            </div>
            <ul className="breadcrumb-list wow fadeInUp mt-4">
              <li>
                <a href="/">首页 /</a>
              </li>
              <li>搜索</li>
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
                    className={`btn btn-outline-primary mb-2 ${
                      selectedCategory === category.name
                        ? "bg-blue-500 text-red"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
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
                    className={`btn btn-outline-primary mb-2 ${
                      selectedProvider === provider.name
                        ? "bg-blue-500 text-red"
                        : ""
                    }`}
                    onClick={() => handleProviderClick(provider.name)}
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
              {filteredData.map((item, index) => (
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

export default ResourcePage;
