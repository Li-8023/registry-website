import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUser,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const BlogSection: React.FC = () => {
  return (
    <section className="blog-two py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="lg:w-7/12 md:w-7/12">
            <div className="section-head">
              <h2 className="text-3xl font-bold mb-4">最佳事件案例与文档</h2>
              <p className="text-lg text-gray-700">
                通过最佳实践，可以快速开发、贡献 Serverless Package
              </p>
            </div>
          </div>
          <div className="lg:w-3/12 md:w-5/12">
            <div className="link text-center md:text-right">
              <a className="main-btn bg-blue-500 text-white py-2 px-4 rounded">
                查看全部文档
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 gap-4">
          <div className="lg:w-7/12">
            <div className="blog-box border rounded-lg p-4">
              <a
                className="thumb"
                href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/439"
              >
                <img
                  src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648813335712_20220401114218504973.png"
                  alt=""
                  className="w-full rounded-lg"
                />
              </a>

              <div className="main-content mt-4">
                <div className="flex justify-between text-gray-600 text-sm">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                    <span>2022.03.20</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    <span>Anycods</span>
                  </div>
                </div>
                <h5 className="text-xl font-semibold mt-4">
                  <a href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/439">
                    快速完成 Serverless Devs 应用开发并发布到 Registry
                  </a>
                </h5>
                <div className="last-part mt-4 flex justify-end">
                  <a
                    className="text-blue-500 flex items-center"
                    href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/439"
                  >
                    阅读详情
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-5/12 flex flex-col justify-between mt-8 lg:mt-0 space-y-4">
            <div className="right-box">
              <img
                style={{ width: "100px" }}
                src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814061808_20220401115422201406.png"
                alt=""
                className="rounded-lg"
              />
              <div className="right-part ml-4">
                <div className="date text-gray-600 text-sm">2021.06</div>
                <h6 className="text-lg font-semibold mt-2">
                  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/readme.md">
                    什么是 Serverless Devs ？
                  </a>
                </h6>
                <div className="last-part mt-2">
                  <a
                    className="text-blue-500 flex items-center"
                    href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/readme.md"
                  >
                    阅读更多
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
            <div className="right-box">
              <img
                style={{ width: "100px" }}
                src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814119666_20220401115519778987.png"
                alt=""
                className="rounded-lg"
              />
              <div className="right-part ml-4">
                <div className="date text-gray-600 text-sm">2022.04</div>
                <h6 className="text-lg font-semibold mt-2">
                  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md">
                    Serverless Devs Model 规范文档
                  </a>
                </h6>
                <div className="last-part mt-2">
                  <a
                    className="text-blue-500 flex items-center"
                    href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md"
                  >
                    阅读更多
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
            <div className="right-box">
              <img
                style={{ width: "100px" }}
                src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814406516_20220401120006833466.png"
                alt=""
                className="rounded-lg"
              />
              <div className="right-part ml-4">
                <div className="date text-gray-600 text-sm">2022.01</div>
                <h6 className="text-lg font-semibold mt-2">
                  <a href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/407">
                    快速开发Serverless Package
                  </a>
                </h6>
                <div className="last-part mt-2">
                  <a
                    className="text-blue-500 flex items-center"
                    href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/407"
                  >
                    阅读更多
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
