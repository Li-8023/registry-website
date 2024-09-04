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
      className="wow fadeInUp mb-4"
      data-wow-delay={`${item.delayTime}s`}
      style={{
        visibility: "visible",
        animationDelay: "0.2s",
        animationName: "fadeInUp",
      }}
    >
      <div
        className="themes-box shadow-lg rounded-xl overflow-hidden"
        style={{
          overflow: "hidden",
          width: "100%",
          maxWidth: "350px",
          margin: "0 auto",
        }}
      >
        <div className="main-content p-3">
          <h5 className="flex justify-between items-center text-sm">
            <Link href={`/details/${item.name}`}>
              {splitMaxLength(item.name, 30)}
            </Link>
            <span className="flex items-center text-orange-500 text-sm">
              <FontAwesomeIcon icon={faFire} className="mr-1" />
              {item.download}
            </span>
          </h5>
          <div className="last-part mt-2">
            <div className="right" style={{ width: "100%" }}>
              <p className="text text-sm" style={{ width: "100%" }}>
                {item.latest_create && item.latest_create !== "No record" ? (
                  <>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    {formatDate(item.latest_create)}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCalendar} /> xxxx/xx/xx
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
                className="text-flow-ellipsis-multiple mt-2 text-xs"
                style={{ height: "50px", color: "darkgray" }}
              >
                {item.description &&
                  (() => {
                    try {
                      const parsedDescription = JSON.parse(
                        item.description.replace(/'/g, '"')
                      );
                      return parsedDescription.zh;
                    } catch (error) {
                      console.error("Failed to parse description:", error);
                      return item.description;
                    }
                  })()}
              </p>
            </div>
          </div>
          <div className="past-part mt-2">
            <center>
              <div className="button flex space-x-4">
               
                  <button
                    className="preButton btn btn-outline-primary"
                    style={{
                      backgroundColor: "#6676fa",
                      color: "white",
                      fontSize: "0.8rem",
                      padding: "5px 10px",
                    }}
                    onClick={() =>
                      window.open(`/details/${item.name}`, "_blank")
                    }
                  >
                    <FontAwesomeIcon icon={faBook} /> 查看详情
                  </button>
                
                {item.zipball_url ? (
                  <a
                    href={item.zipball_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download btn btn-outline-secondary"
                    style={{
                      fontSize: "0.8rem",
                      padding: "5px 10px",
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} /> 下载组件
                  </a>
                ) : (
                  <button
                    onClick={() => downloadPlugin(item.name)}
                    className="download btn btn-outline-secondary"
                    style={{
                      fontSize: "0.8rem",
                      padding: "5px 10px",
                    }}
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
