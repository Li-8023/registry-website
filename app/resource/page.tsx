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
import LoadingPopup from '../components/LoadingPopup';

type Package = {
  name?: string;
  type?: string;
  package?: string;
  download?: number;
  latest_create?: string;
  version?: { created_at: string };
  source?: string;
  packageName?: string;
  description?: string;
  zipball_url?: string;
};

type Category = {
  id: string;
  name: string;
};

type Provider = {
  id: string;
  name: string;
};

const ResourcePage: React.FC = () => {
  const [data, setData] = useState<Package[]>([]);
  const [sortedData, setSortedData] = useState<Package[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchType, setSearchType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openProviders, setOpenProviders] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [openTypes, setOpenTypes] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [oldData, setOldData] = useState<Package[]>([]);

  const searchParams = useSearchParams();

  const fetchOldPackages = async () => {
    try {
      const response = await fetch(
        "https://registry.devsapp.cn/package/search"
      );
      const result = await response.json();
      setOldData(result.Response);
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
    category: string = "",
    provider: string = "",
    type: string | null = null,
    search: string = ""
  ) => {
    setLoading(true);
    const url = new URL(
      "https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/releases"
    );
    const params: { [key: string]: string | null } = { lang: "zh", type, category, provider, search };

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key] as string);
      }
    });

    try {
      const response = await fetch(url.toString(), { headers: { lang: "zh" } });
      const result = await response.json();
      setData(result.body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    const combinedData = [
      ...data.map((pkg) => ({
        ...pkg,
        source: "new",
        packageName: pkg.name,
      })),
      ...oldData.map((pkg) => ({
        ...pkg,
        source: "old",
        packageName: pkg.package,
      })),
    ];
    setSortedData(combinedData);
  }, [data, oldData]);

  const handleSort = (criteria: string) => {
    setLoading(true);
    setSelectedSort(criteria);
    const sorted = [...sortedData].sort((a, b) => {
      if (criteria === "名称") {
        return (a.packageName || "").localeCompare(b.packageName || "");
      }
      if (criteria === "下载") {
        return (b.download || 0) - (a.download || 0);
      }
      if (criteria === "日期") {
        return (
          new Date(b.latest_create || b.version?.created_at || 0).getTime() -
          new Date(a.latest_create || a.version?.created_at || 0).getTime()
        );
      }
      return 0;
    });
    setSortedData(sorted);
    setLoading(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    fetchData(selectedCategory, selectedProvider, searchType, event.target.value);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "None" ? "" : category);
    fetchData(
      category === "None" ? "" : category,
      selectedProvider,
      searchType,
      searchQuery
    );
  };

  const handleProviderClick = (provider: string) => {
    setSelectedProvider(provider === "None" ? "" : provider);
    fetchData(
      selectedCategory,
      provider === "None" ? "" : provider,
      searchType,
      searchQuery
    );
  };

  const handleTypeClick = (type: string) => {
    const typeMap: { [key: string]: string } = {
      "1": "1",
      "2": "2",
      "3": "3",
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
    <div style={{ backgroundColor: "#121316", minHeight: "100vh" }}>
      <Header />
      {loading && <LoadingPopup />}

      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: "url('/image/banner.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="content text-white">
            {/* Centered Title */}
            <h1
              style={{
                fontSize: "3.0rem",
                fontWeight: "bold",
                marginBottom: "30px",
                color: "#FFFFFF",
              }}
            >
              Serverless 包管理平台
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.7, color: "#FFFFFF", marginBottom: "30px", }}>
              让你像使用手机一样玩转Serverless架构
            </p>

            {/* Search Input */}
            <div className="search-container relative inline-block w-full max-w-md">
              <input
                type="text"
                placeholder="搜索 Package ..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-3 pl-4 pr-12 border border-white rounded-md bg-opacity-25 text-white placeholder-white"
                style={{
                  background: "rgba(255, 255, 255, 0.1)", 
                  borderRadius: "20px", 
                  height:"45px",
                  borderColor: "#b4b6c0", 
                  color: "#adb4f5", 
                }}
              />
              <span className="absolute inset-y-0 right-4 flex items-center">
                <img
                  src="/image/search.svg"
                  alt="Search Icon"
                  className="w-5 h-5"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="main-content-section" style={{ backgroundColor: "transparent" }}>
  <div className="container mx-auto flex flex-wrap py-12">
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

      {/* Expandable sections */}
      <ListItemButton onClick={toggleTypes}>
        <ListItemIcon>
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText primary="类别" />
        {openTypes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTypes} timeout="auto" unmountOnExit sx={{ bgcolor: "#1c1d21" }}>
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

      {/* Repeat similar updates for Categories, Providers, and Sort sections */}
      <ListItemButton onClick={toggleCategories}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="分类" />
        {openCategories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategories} timeout="auto" unmountOnExit sx={{ bgcolor: "#1c1d21" }}>
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

      {/* Update the same way for Sort and Providers */}
    </Box>

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
            <CardItem
              key={index}
              item={{
                name: item.name || "Unknown Name",
                type: item.type || "Unknown Type",
                download: item.download || 0,
                latest_create: item.latest_create || "",
                description: item.description,
                zipball_url: item.zipball_url,
              }}
            />
          ) : (
            <OldCardItem
              key={index}
              item={{
                package: item.package || "Unknown Package",
                download: item.download || 0,
                version: item.version || { created_at: "" },
                description: item.description,
                zipball_url: item.zipball_url,
              }}
            />
          )
        )}
      </div>
    </div>
  </div>
</section>
<section className="main-content-section">
  <div className="container mx-auto flex flex-wrap py-12">
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

      <ListItemButton onClick={toggleTypes}>
        <ListItemIcon>
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText primary="类别" />
        {openTypes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTypes} timeout="auto" unmountOnExit sx={{ bgcolor: "#1c1d21" }}>
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

      <ListItemButton onClick={toggleCategories}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="分类" />
        {openCategories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategories} timeout="auto" unmountOnExit sx={{ bgcolor: "#1c1d21" }}>
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

    </Box>

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
            <CardItem
              key={index}
              item={{
                name: item.name || "Unknown Name",
                type: item.type || "Unknown Type",
                download: item.download || 0,
                latest_create: item.latest_create || "",
                description: item.description,
                zipball_url: item.zipball_url,
              }}
            />
          ) : (
            <OldCardItem
              key={index}
              item={{
                package: item.package || "Unknown Package",
                download: item.download || 0,
                version: item.version || { created_at: "" },
                description: item.description,
                zipball_url: item.zipball_url,
              }}
            />
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