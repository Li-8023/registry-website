import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faDownload,
  faFire,
  faCalendar,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

const CardItem = ({ item }) => {
  const splitMaxLength = (str, length) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  const downloadPlugin = (name) => {
    console.log(`Downloading plugin: ${name}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("zh-CN", options);
  };

  return (
    <div
      className="col-xl-6 wow fadeInUp mb-4"
      data-wow-delay={`${item.delayTime}s`}
      style={{
        visibility: "visible",
        animationDelay: "0.2s",
        animationName: "fadeInUp",
      }}
    >
      <div
        className="themes-box shadow-lg rounded-2xl overflow-hidden"
        style={{ overflow: "hidden" }}
      >
        <div className="main-content p-4">
          <h5 className="flex justify-between items-center">
            <Link href={`/details/${item.name}`}>
              {splitMaxLength(item.name, 27)}
            </Link>
            <span className="flex items-center text-orange-500">
              <FontAwesomeIcon icon={faFire} className="mr-1" />
              {item.download}
            </span>
          </h5>
          <div className="last-part mt-8">
            <div className="right" style={{ width: "100%" }}>
              <p className="text" style={{ width: "100%" }}>
                {item.latest_create && (
                  <>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    {formatDate(item.latest_create)}
                  </>
                )}
                {item.latest_create && item.version && (
                  <>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</>
                )}
                {item.version && (
                  <>
                    <FontAwesomeIcon icon={faDesktop} /> V{item.version}
                  </>
                )}
              </p>
              <p
                className="text-flow-ellipsis-multiple mt-2"
                style={{ height: "70px" }}
              >
                {item.description}
              </p>
            </div>
          </div>
          <div className="past-part mt-4 ml-7">
            <center>
              <div className="button flex space-x-10">
                <Link href={`/details/${item.name}`}>
                  <button
                    className="preButton btn btn-outline-primary"
                    style={{ backgroundColor: "#6676fa", color: "white" }}
                  >
                    <FontAwesomeIcon icon={faBook} /> 查看详情
                  </button>
                </Link>
                {item.zipball_url ? (
                  <a
                    href={item.zipball_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download btn btn-outline-secondary ml-2"
                  >
                    <FontAwesomeIcon icon={faDownload} /> 下载组件
                  </a>
                ) : (
                  <button
                    onClick={() => downloadPlugin(item.name)}
                    className="download btn btn-outline-secondary ml-2"
                  >
                    <FontAwesomeIcon icon={faDownload} /> 下载组件
                  </button>
                )}
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
