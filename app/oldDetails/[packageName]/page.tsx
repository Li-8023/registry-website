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
  create: string;
  tag_name: string;
  version: string;
  description: string;
  zipball_url: string;
  readme: string;
  home: string;
  provider?: string[];
  tags?: string[];
  userInformation?: {
    avatar_url: string;
    html_url: string;
    user: string;
  };
}

interface Release {
  tag_name: string;
  name: string;
  created_at: string;
  zipball_url: string;
}

const PackageDetail: React.FC<PackageDetailProps> = ({ params }) => {
  const { packageName } = params;

  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [releases, setReleases] = useState<Release[] | null>(null);

  useEffect(() => {
    if (packageName) {
      fetchPackageDetails(packageName);
      fetchPackageReleases(packageName);
    }
  }, [packageName]);

  const fetchPackageDetails = async (packageName: string) => {
    const base_url = "https://registry.devsapp.cn";
    try {
      const response = await fetch(`${base_url}/package/content`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${packageName}`, 
      });
      const result = await response.json();
      console.log("Fetched package details:", result);

      if (result.Error === "GetParameterFailed" || !result.Response) {
        setNotFound(true); 
      } else {
        setPackageDetails(result.Response);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching package details:", error);
      setError("Unable to fetch package details.");
      setLoading(false);
    }
  };

  const fetchPackageReleases = async (packageName: string) => {
    const base_url = "https://registry.devsapp.cn";
    try {
      const response = await fetch(`${base_url}/simple/${packageName}/releases`);
      const result = await response.json();

      if (result.Response) {
        setReleases(result.Response);
      }
    } catch (error) {
      console.error("Error fetching package releases:", error);
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
                <h2 className="breadd wow fadeInUp text-gray-500">{packageDetails?.name}</h2>
                <div className="flex items-center space-x-2 text-black">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span >
                    {`${formatDateWithHyphen(packageDetails?.create || "")} / V ${packageDetails?.version || ""}`}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary text-white border border-primary"
                  onClick={() => 
                    releases && releases.length > 0 
                    ? window.open(releases[0].zipball_url, "_blank")
                    : window.open(packageDetails?.zipball_url, "_blank")
                  }
                >
                  <FontAwesomeIcon icon={faDownload} /> 下载
                </button>
              </div>
            </div>
            <ul className="breadcrumb-list wow fadeInUp">
              <li>
                <a href="/" className="text-gray-500">首页 /</a>
              </li>
              <li className="text-gray-500">应用详情</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-7/12 p-4">
            <div className="card mb-4 p-4">
              <p className="card-text text-gray-500">{packageDetails?.description}</p>
            </div>
            <div className="card p-4">
              <ReadmeSection
                readme={packageDetails?.readme || ""}
                home={packageDetails?.home || ""}
              />
            </div>
          </div>
          <div className="w-5/12 p-4">
            {packageDetails?.userInformation && (
              <div className="card mb-4 p-4 text-center">
                <img
                  src={packageDetails.userInformation.avatar_url}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <a
                  href={packageDetails.userInformation.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  {packageDetails.userInformation.user}
                </a>
              </div>
            )}
            <div className="card mb-4 p-4">
              <p className="card-text text-gray-500">
                厂商支持：
                {packageDetails?.provider && Array.isArray(packageDetails?.provider)
                  ? packageDetails.provider.join(", ")
                  : "未知"}
              </p>
            </div>

            <div className="card mb-4 p-4">
              <p className="card-text text-gray-500">更新时间: {formatDateWithHyphen(packageDetails?.create || "")}</p>
              <p className="card-text text-gray-500">更新版本: {packageDetails?.version}</p>
            </div>

            <div className="card mb-4 p-4">
              <h2 className="card-title text-xl font-bold mb-2 text-gray-500">历史版本</h2>
              {releases && releases.length > 0 ? (
                <ul className="text-gray-500">
                  {releases.map((release) => (
                    <li key={release.tag_name}>
                      <a
                        href={release.zipball_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500"
                      >
                        {`V${release.tag_name} (${formatDateWithHyphen(release.created_at)})`}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">无历史版本</p>
              )}
            </div>

            <div className="card p-4">
              <h2 className="card-title text-xl font-bold mb-2 text-gray-500">标签</h2>
              <p className="card-text text-gray-500">
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

  const formattedReadme =
    readme && typeof readme === "string" && readme.trim() !== ""
      ? md.render(readme)
      : "无";

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
          className="card-text text-gray-500"
          dangerouslySetInnerHTML={{ __html: formattedReadme }}
        ></div>
      )}
      {showContent === "services" && <div className="card-text text-gray-500">未知</div>}
    </div>
  );
};

export default PackageDetail;
