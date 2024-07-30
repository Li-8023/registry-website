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
        {/* {item.package_type === "v2" && (
          <div
            className="ribbon"
            data-spm-anchor-id="5176.28448578.0.i154.758e60cczu7hm5"
          >
            仅维护
          </div>
        )} */}
        <div className="main-content p-4">
          <h5 className="flex justify-between items-center">
            <Link
              href={`details.html?name=${item.name}&package_type=${item.package_type}`}
            >
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
                {item.published_at && (
                  <>
                    <FontAwesomeIcon icon={faCalendar} /> {item.published_at}
                  </>
                )}
                {item.published_at && item.version && (
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
                <Link
                  href={`details.html?name=${item.name}&package_type=${item.package_type}`}
                >
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
