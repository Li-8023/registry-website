"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import markdownit from "markdown-it";
import Footer from "@/app/components/Footer";
import React from "react";

interface PackageDetailProps {
  params: {
    packageName: string;
  };
}

interface PackageDetails {
  name: string;
  created_at: string;
  tag_name: string;
  version: {
    zipball_url: string;
  };
  description: string;
  readme: string;
  home: string;
  provider?: string[];
  tags?: string[];
}

const PackageDetail: React.FC<PackageDetailProps> = ({ params }) => {
  const { packageName } = params;

  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);  

  useEffect(() => {
    if (packageName) {
      fetchPackageDetails(packageName);
    }
  }, [packageName]);

  const fetchPackageDetails = async (packageName: string) => {
    try {
      const response = await fetch(
        `https://api.devsapp.cn/v3/packages/${packageName}/release/latest`
      );
      const result = await response.json();

      if (result.body === "未找到指定资源") {
        setNotFound(true);  // Set the notFound flag
      } else {
        setPackageDetails(result.body);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching package details:", error);
      setError("Unable to fetch package details.");
      setLoading(false);
    }
  };

  const formatDateWithHyphen = (dateString: string) => {
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

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (notFound) {  
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">未找到指定资源</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="breadd wow fadeInUp">{packageDetails?.name}</h2>
                <div className="flex items-center space-x-2 text-black">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>
                    {formatDateWithHyphen(packageDetails?.created_at || "")} / V
                    {packageDetails?.tag_name}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary text-white border border-primary"
                  onClick={() =>
                    window.open(packageDetails?.version.zipball_url, "_blank")
                  }
                >
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

      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-7/12 p-4">
            <div className="card mb-4 p-4">
              <p className="card-text">{packageDetails?.description}</p>
            </div>
            <div className="card p-4">
              <ReadmeSection
                readme={packageDetails?.readme || ""}
                home={packageDetails?.home || ""}
              />
            </div>
          </div>
          <div className="w-5/12 p-4">
            <div className="card mb-4 p-4">
              <p className="card-text">
                厂商支持：
                {packageDetails?.provider && Array.isArray(packageDetails?.provider)
                  ? packageDetails.provider.join(", ")
                  : "未知"}
              </p>
            </div>

            <div className="card mb-4 p-4">
              <p className="card-text">更新时间: {packageDetails?.created_at}</p>
              <p className="card-text">更新版本: {packageDetails?.tag_name}</p>
            </div>

            <div className="card p-4">
              <h2 className="card-title text-xl font-bold mb-2">标签</h2>
              <p className="card-text">
                {packageDetails?.tags && Array.isArray(packageDetails?.tags)
                  ? packageDetails.tags.join(", ")
                  : "无标签"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

interface ReadmeSectionProps {
  readme: string;
  home: string;
}

const ReadmeSection: React.FC<ReadmeSectionProps> = ({ readme, home }) => {
  const [showContent, setShowContent] = useState<string>("readme");

  const handleButtonClick = (content: string) => {
    setShowContent(content);
  };

  // Markdown-it initialization
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
    highlight: function () {
      return "";
    },
  });

  // Check if readme exists and is a string
  const formattedReadme =
    readme && typeof readme === "string" ? md.render(readme) : "暂无帮助文档";

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
          dangerouslySetInnerHTML={{ __html: formattedReadme }}
        ></div>
      )}
      {showContent === "services" && <div className="card-text">未知</div>}
    </div>
  );
};

export default PackageDetail;
