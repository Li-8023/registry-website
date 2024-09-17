"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardItem from "../components/card/CardItem";
import OldCardItem from "../components/card/CardItemOld";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExtensionIcon from "@mui/icons-material/Extension";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CategoryIcon from '@mui/icons-material/Category';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import LoadingPopup from '../components/LoadingPopup'


const ResourcePage = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [searchType, setSearchType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [openTypes, setOpenTypes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldData, setOldData] = useState([]); // For old packages

  const searchParams = useSearchParams();

    const fetchOldPackages = async () => {
      try {
        const response = await fetch(
          "https://registry.devsapp.cn/package/search"
        );
        const result = await response.json();
        setOldData(result.Response); // Save old package data
      } catch (error) {
        console.error("Error fetching old packages:", error);
      }
    };

  useEffect(() => {
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
    fetchOldPackages();
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
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    // Combine old and new packages, adjusting key differences
    const combinedData = [
      ...data.map((pkg) => ({
        ...pkg,
        source: "new", // Flag to indicate it's from the new API
        packageName: pkg.name,
      })),
      ...oldData.map((pkg) => ({
        ...pkg,
        source: "old", // Flag to indicate it's from the old API
        packageName: pkg.package,
      })),
    ];
    setSortedData(combinedData);
  }, [data, oldData]);


  const handleSort = (criteria) => {
    setLoading(true);
    setSelectedSort(criteria); // Keep track of the selected sorting criteria
    const sorted = [...sortedData].sort((a, b) => {
      if (criteria === "名称") {
        return a.packageName.localeCompare(b.packageName); // Compare using packageName
      }
      if (criteria === "下载") {
        return b.download - a.download;
      }
      if (criteria === "日期") {
        return (
          new Date(b.latest_create || b.version.created_at) -
          new Date(a.latest_create || a.version.created_at)
        );
      }
      return 0;
    });
    setSortedData(sorted);
    setLoading(false);
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

  const handleTypeClick = (type) => {
    const typeMap = {
      1: "1",
      2: "2",
      3: "3",
    };

    const selectedTypeValue = typeMap[type] || type;
    setSelectedType(selectedTypeValue);
    fetchData(
      selectedCategory,
      selectedProvider,
      selectedTypeValue,
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

  const toggleTypes = () => {
    setOpenTypes(!openTypes);
  };

  return (
    <div>
      <Header />
      {loading && <LoadingPopup />}

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
          <Box
            sx={{
              width: "100%",
              maxWidth: 250,
              bgcolor: "background.paper",
              overflowY: "auto",
              maxHeight: 600,
              marginRight: 5,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListSubheader component="div" id="nested-list-subheader">
              筛选
            </ListSubheader>

            {/* Types */}
            <ListItemButton onClick={toggleTypes}>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="类别" />
              {openTypes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTypes} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  { type: "1", label: "组件" },
                  { type: "2", label: "插件" },
                  { type: "3", label: "应用" },
                ].map((option) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={option.type}
                    onClick={() => handleTypeClick(option.type)}
                  >
                    <Checkbox
                      checked={selectedType === option.type}
                      onChange={() => handleTypeClick(option.type)}
                    />
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Categories */}
            <ListItemButton onClick={toggleCategories}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="分类" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleCategoryClick("None")}
                >
                  <Checkbox
                    checked={selectedCategory === ""}
                    onChange={() => handleCategoryClick("None")}
                  />
                  <ListItemText primary={"全部"} />
                </ListItemButton>
                {categories.map((category) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <Checkbox
                      checked={selectedCategory === category.name}
                      onChange={() => handleCategoryClick(category.name)}
                    />
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Sort */}
            <ListItemButton onClick={toggleSort}>
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText primary="排序" />
              {openSort ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSort} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {["名称", "下载", "日期"].map((criteria) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={criteria}
                    onClick={() => handleSort(criteria)}
                  >
                    <Checkbox
                      checked={selectedSort === criteria}
                      onChange={() => handleSort(criteria)}
                    />
                    <ListItemText primary={`按${criteria}排序`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Providers */}
            <ListItemButton onClick={toggleProviders}>
              <ListItemIcon>
                <CloudCircleIcon />
              </ListItemIcon>
              <ListItemText primary="云厂商" />
              {openProviders ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProviders} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleProviderClick("None")}
                >
                  <Checkbox
                    checked={selectedProvider === ""}
                    onChange={() => handleProviderClick("None")}
                  />
                  <ListItemText primary={"全部"} />
                </ListItemButton>
                {providers.map((provider) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={provider.id}
                    onClick={() => handleProviderClick(provider.name)}
                  >
                    <Checkbox
                      checked={selectedProvider === provider.name}
                      onChange={() => handleProviderClick(provider.name)}
                    />
                    <ListItemText primary={provider.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>

          {/* Right Section  */}
          <div className="w-full md:w-7/12 lg:w-9/12">
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              {sortedData.map((item, index) =>
                item.source === "new" ? (
                  <CardItem key={index} item={item} />
                ) : (
                  <OldCardItem key={index} item={item} />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcePage;