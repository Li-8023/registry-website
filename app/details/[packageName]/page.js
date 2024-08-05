"use client"
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import markdownit from "markdown-it";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDownload } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/app/components/Footer";

async function fetchPackageDetail(packageName) {
  const res = await fetch(
    `https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/${packageName}/release/latest`
  );
  const data = await res.json();
  return data.body;
}

async function fetchPackageHistory(packageName) {
  const res = await fetch(
    `https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/${packageName}/release`
  );
  const data = await res.json();
  return data.body;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
}


const formatDateWithHyphen = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString)
    .toLocaleDateString("zh-CN", {
      ...options,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
};

const PackageDetailPage = async ({ params }) => {
  const packageDetail = await fetchPackageDetail(params.packageName);
  const packageHistory = await fetchPackageHistory(params.packageName);

  if (packageDetail === "未找到指定资源") {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">未找到指定资源</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {/* Banner start */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="breadd wow fadeInUp">{packageDetail.name}</h2>
                <div className="flex items-center space-x-2 text-black">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>
                    {formatDateWithHyphen(packageDetail.created_at)} / V
                    {packageDetail.tag_name}
                  </span>
                </div>
              </div>
              <div>
                <button className="btn btn-outline-primary text-white border border-primary">
                  <FontAwesomeIcon icon={faDownload} /> 下载
                </button>
              </div>
            </div>
            <ul className="breadcrumb-list wow fadeInUp">
              <li>
                <a href="/">首页 /</a>
              </li>
              <li>应用详情</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Banner end */}


      <div className="container mx-auto p-4">
        <div className="flex">
          {/* Left Part */}
          <div className="w-7/12 p-4">
            {/* Upper Part */}
            <div className="card mb-4 p-4">
              {/* <h2 className="card-title text-2xl font-bold mb-4">描述</h2> */}
              <p className="card-text">{packageDetail.description}</p>
            </div>
            {/* Below Part */}
            <div className="card p-4">
              {/* <h2 className="card-title text-2xl font-bold mb-4">Readme</h2> */}
              <ReadmeSection
                readme={packageDetail.readme}
                home={packageDetail.home}
              />
            </div>
          </div>
          {/* Right Part */}
          <div className="w-5/12 p-4">
            {/* Provider */}
            <div className="card mb-4 p-4">
              {/* <h2 className="card-title text-xl font-bold mb-2">厂商支持</h2> */}
              <p className="card-text">
                厂商支持：{packageDetail.provider.join(", ")}
              </p>
            </div>
            {/* Created At and Tag Name */}
            <div className="card mb-4 p-4">
              {/* <h2 className="card-title text-xl font-bold mb-2">
                Created At and Tag Name
              </h2> */}
              <p className="card-text">更新时间: {packageDetail.created_at}</p>
              <p className="card-text">更新版本: {packageDetail.tag_name}</p>
            </div>
            {/* History Versions */}
            <div className="card mb-4 p-4">
              <h2 className="card-title text-xl font-bold mb-2">历史版本</h2>
              <ul className="list-group">
                {packageHistory.map((version, index) => (
                  <li key={index} className="list-group-item">
                    V{version.tag_name} ({formatDate(version.created_at)})
                  </li>
                ))}
              </ul>
            </div>
            {/* Tags */}
            <div className="card p-4">
              <h2 className="card-title text-xl font-bold mb-2">标签</h2>
              <p className="card-text">{packageDetail.tags.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ReadmeSection = ({ readme, home }) => {
  const [showContent, setShowContent] = useState("readme");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (showContent === "readme") {
      const md = new markdownit({
        html: true,
        linkify: true,
        typographer: true,
      });
      setHtmlContent(md.render(readme));
    }
  }, [showContent, readme]);

  const handleButtonClick = (content) => {
    setShowContent(content);
  };

  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <button
          type="button"
          className={`btn ${
            showContent === "readme" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleButtonClick("readme")}
        >
          帮助
        </button>
        <button
          type="button"
          className={`btn ${
            showContent === "services" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleButtonClick("services")}
        >
          服务与权限
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => window.open(home, "_blank")}
        >
          项目网站
        </button>
      </div>
      {showContent === "readme" && (
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}
      {showContent === "services" && <div className="card-text">未知</div>}
    </div>
  );
};


export default PackageDetailPage;
