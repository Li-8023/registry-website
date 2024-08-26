"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardItem from "../components/card/CardItem";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";

const ResourcePage = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [searchType, setSearchType] = useState(null); // Default to null
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);
  const [openSort, setOpenSort] = useState(false);
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
    setSelectedCategory(category === "None" ? "" : category);
    fetchData(
      category === "None" ? "" : category,
      selectedProvider,
      searchType,
      searchQuery
    );
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider === "None" ? "" : provider);
    fetchData(
      selectedCategory,
      provider === "None" ? "" : provider,
      searchType,
      searchQuery
    );
  };

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const toggleProviders = () => {
    setOpenProviders(!openProviders);
  };

  const toggleSort = () => {
    setOpenSort(!openSort);
  };

  return (
    <div>
      <Header />

      {/* Banner start */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <input
              type="text"
              placeholder="搜索..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input w-full p-2 border rounded"
            />
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
          {/* Left Section */}
          <div className="w-full md:w-5/12 lg:w-4/12 pr-4">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  筛选
                </ListSubheader>
              }
            >
              {/* Categories */}
              <ListItemButton onClick={toggleCategories}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
                {openCategories ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategories} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categories.map((category) => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={category.id}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  ))}

                </List>
              </Collapse>

              {/* Providers */}
              <ListItemButton onClick={toggleProviders}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Providers" />
                {openProviders ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openProviders} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {providers.map((provider) => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={provider.id}
                      onClick={() => handleProviderClick(provider.name)}
                    >
                      <ListItemText primary={provider.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              {/* Sort */}
              <ListItemButton onClick={toggleSort}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sort" />
                {openSort ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSort} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleSort("name")}
                  >
                    <ListItemText primary="按名称排序" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleSort("download")}
                  >
                    <ListItemText primary="按下载量排序" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleSort("date")}
                  >
                    <ListItemText primary="按发布时间排序" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </div>

          {/* Right Section  */}
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

export default ResourcePage;




{
  /* <div className="sorting-section bg-white p-4 rounded shadow">
              <h4 className="mb-4">分类</h4>
              <div className="btn-group-vertical w-full">
                <button
                  className={`btn btn-outline-primary mb-2 ${
                    selectedCategory === "" ? "bg-blue-500 text-red" : ""
                  }`}
                  onClick={() => handleCategoryClick("None")}
                >
                  无
                </button>
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
              </div>
            </div> */
}

{
  /* <div className="sorting-section bg-white p-4 rounded shadow mt-4">
              <h4 className="mb-4">云厂商</h4>
              <div className="btn-group-vertical w-full">
                <button
                  className={`btn btn-outline-primary mb-2 ${
                    selectedProvider === "" ? "bg-blue-500 text-red" : ""
                  }`}
                  onClick={() => handleProviderClick("None")}
                >
                  无
                </button>
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
            </div> */
}

{
  /* Sorting Section */
}

{
  /* <div className="sorting-section bg-white p-4 rounded shadow">
              <h4 className="mb-4">排序</h4>
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
                <button
                  className={`btn btn-outline-primary mb-2 ${
                    selectedProvider === "" ? "bg-blue-500 text-red" : ""
                  }`}
                  onClick={() => handleProviderClick("None")}
                >
                  取消选择
                </button>
              </div>
            </div> */
}
