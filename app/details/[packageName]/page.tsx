"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDownload } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/app/components/Footer";
import markdownit from "markdown-it";

interface PackageDetailProps {
  params: {
    packageName: string;
  };
}

interface PackageDetails {
  name: string;
  created_at: string;
  tag_name: string;
  zipball_url: string;
  description: string;
  readme: string;
  home: string;
  provider: string[];
  tags: string[];
}

interface PackageHistoryItem {
  tag_name: string;
  created_at: string;
}

async function fetchPackageDetail(packageName: string): Promise<PackageDetails | "未找到指定资源"> {
  try {
    const res = await fetch(
      `https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/${packageName}/release/latest`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch package details");
    }
    const data = await res.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching package details:", error);
    return "未找到指定资源";
  }
}

async function fetchPackageHistory(packageName: string): Promise<PackageHistoryItem[]> {
  try {
    const res = await fetch(
      `https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/${packageName}/release`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch package history");
    }
    const data = await res.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching package history:", error);
    return [];
  }
}


function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
}


const formatDateWithHyphen = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString)
    .toLocaleDateString("zh-CN", options)
    .replace(/\//g, "-");
};


const PackageDetailPage: React.FC<PackageDetailProps> = ({ params }) => {
  const [packageDetail, setPackageDetail] = useState<PackageDetails | null>(null);
  const [packageHistory, setPackageHistory] = useState<PackageHistoryItem[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const detail = await fetchPackageDetail(params.packageName);
      if (detail === "未找到指定资源") {
        setNotFound(true);
      } else {
        setPackageDetail(detail);
      }

      const history = await fetchPackageHistory(params.packageName);
      setPackageHistory(history);
    }

    fetchData();
  }, [params.packageName]);

  if (!packageDetail && !notFound) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">加载中...</h1>
      </div>
    );
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
                <h2 className="breadd wow fadeInUp">{packageDetail?.name}</h2>
                <div className="flex items-center space-x-2 text-black">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>
                    {formatDateWithHyphen(packageDetail?.created_at || "")} / V
                    {packageDetail?.tag_name}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary text-white border border-primary"
                  onClick={() =>
                    window.open(packageDetail?.zipball_url, "_blank")
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
              <p className="card-text">{packageDetail?.description}</p>
            </div>
            <div className="card p-4">
              <ReadmeSection
                readme={packageDetail?.readme || ""}
                home={packageDetail?.home || ""}
              />
            </div>
          </div>
          <div className="w-5/12 p-4">
            <div className="card mb-4 p-4">
              <p className="card-text">
                厂商支持：{packageDetail?.provider.join(", ")}
              </p>
            </div>
            <div className="card mb-4 p-4">
              <p className="card-text">更新时间: {packageDetail?.created_at}</p>
              <p className="card-text">更新版本: {packageDetail?.tag_name}</p>
            </div>
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
            <div className="card p-4">
              <h2 className="card-title text-xl font-bold mb-2">标签</h2>
              <p className="card-text">{packageDetail?.tags.join(", ")}</p>
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

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
    highlight: function () {
      return "";
    },
  });

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
          dangerouslySetInnerHTML={{ __html: md.render(readme) }}
        ></div>
      )}
      {showContent === "services" && <div className="card-text">未知</div>}
    </div>
  );
};

export default PackageDetailPage;
