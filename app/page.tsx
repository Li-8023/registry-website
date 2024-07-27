// app/main/page.tsx
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes, faSearch, faCalendarAlt, faUser, faArrowRight, faArrowUp, faFire, faDesktop } from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div>

      {/* Header */}
      <header className="sticky top-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-400 shadow-md z-10 p-4">
        <div className="pb-1.5">
          <div className="container mx-auto flex items-center justify-between">
            <div className="header-left">
              <h1 className="text-white">Serverless Registry</h1>
            </div>
            <div className="header-right flex items-center justify-end space-x-4">
              <div className="site-nav-menu">
                <ul className="primary-menu flex space-x-4">
                  <li className="current">
                    <Link href="/" className="nav-link text-white">
                      首页
                    </Link>
                  </li>
                  <li>
                    <Link href="/application" className="nav-link text-white">
                      应用
                    </Link>
                  </li>
                  <li>
                    <Link href="/component" className="nav-link text-white">
                      组件
                    </Link>
                  </li>
                  <li>
                    <Link href="/plugin" className="nav-link text-white">
                      插件
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.2/serverless_registry_model/readme.md"
                      target="_blank"
                      className="nav-link text-white"
                    >
                      规范
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="nav-link text-white">
                      常见问题
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="header-extra flex items-center space-x-4">
                <div className="search-widget">
                  <a href="#0" className="search-icon text-white" onClick={toggleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </a>
                  {showSearch && (
                    <div className="search-form mt-2">
                      <form action="search.html" method="GET">
                        <input
                          type="search"
                          placeholder="请输入要搜索的 Serverless Package 关键词"
                          name="keyword"
                          className="form-control border rounded p-2"
                        />
                      </form>
                      <a href="#0" className="search-close text-white" onClick={toggleSearch}>
                        <FontAwesomeIcon icon={faTimes} />
                      </a>
                    </div>
                  )}
                </div>
                <div className="offcanvas-widget hidden">
                  <div className="offcanvas-icon">
                    <span className="block w-5 h-0.5 bg-white mb-1"></span>
                    <span className="block w-5 h-0.5 bg-white mb-1"></span>
                    <span className="block w-5 h-0.5 bg-white"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="banner two">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="lg:w-10/12 wow fadeInUp" data-wow-delay="0.3s">
              <div className="banner-content text-center">
                <h1 className="text-4xl font-bold">Serverless Registry</h1>
                <p className="text-lg">
                  Serverless 包管理平台：让你像使用手机一样玩转 Serverless 架构
                </p>
                <form action="search.html" method="GET">
                  <div className="form-group flex items-center mt-4">
                    <input
                      type="text"
                      placeholder="搜索 Package ..."
                      className="form-control p-2 border border-gray-300 rounded"
                      name="keyword"
                    />
                    <button className="main-btn icon ml-2 p-2 bg-indigo-500 text-white rounded">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner End */}

      {/* Why Choose Start */}
      <div className="why-choose py-12">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="lg:w-6/12 text-center wow fadeInUp" data-wow-delay="0.3s">
              <div className="section-head">
                <h2 className="text-3xl font-bold mb-4">为什么选择 Serverless Registry</h2>
                <p className="text-lg text-gray-700">
                  Serverless Registry 是一个无厂商锁定的 Serverless 包管理平台，以开源项目 Serverless Devs 作为工具，可以帮助开发者非常简单、方便、快速的进行上手 Serverless 架构，助力开发者可以像使用手机一样，玩转 Serverless 架构。
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-8">
            <div className="xl:w-3/12 md:w-6/12 text-center wow fadeInUp" data-wow-delay="0.2s">
              <div className="chose-box p-4">
                <div className="thumb mb-4">
                  <img src="static/picture/choose-1.png" alt="" className="mx-auto" />
                </div>
                <h5 className="text-xl font-semibold mb-2">无厂商锁定</h5>
                <p className="text-gray-700">
                  不限厂商，符合 <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.2/serverless_package_model/readme.md" target="_blank" className="text-blue-500">SPM 规范</a>，就可以分享给其他 Serverlessor
                </p>
              </div>
            </div>
            <div className="xl:w-3/12 md:w-6/12 text-center wow fadeInUp" data-wow-delay="0.3s">
              <div className="chose-box p-4">
                <div className="thumb mb-4">
                  <img src="static/picture/choose-2.png" alt="" className="mx-auto" />
                </div>
                <h5 className="text-xl font-semibold mb-2">开源建设</h5>
                <p className="text-gray-700">
                  规范、工具、网站，完全开源建设，以开源驱动行业繁荣
                </p>
              </div>
            </div>
            <div className="xl:w-3/12 md:w-6/12 text-center wow fadeInUp" data-wow-delay="0.4s">
              <div className="chose-box p-4">
                <div className="thumb mb-4">
                  <img src="static/picture/choose-3.png" alt="" className="mx-auto" />
                </div>
                <h5 className="text-xl font-semibold mb-2">开放生态</h5>
                <p className="text-gray-700">
                  基于 Github 授权，人人可参与，人人可贡献，人人可分享
                </p>
              </div>
            </div>
            <div className="xl:w-3/12 md:w-6/12 text-center wow fadeInUp" data-wow-delay="0.5s">
              <div className="chose-box p-4">
                <div className="thumb mb-4">
                  <img src="static/picture/choose-4.png" alt="" className="mx-auto" />
                </div>
                <h5 className="text-xl font-semibold mb-2 mt-2">免费提供</h5>
                <p className="text-gray-700">
                  Registry 平台本身不涉及任何收费项，免费开放给开发者
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why Choose End */}

      {/* Featured Start */}
      <section className="feature item three py-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="lg:w-5/12 md:w-6/12 wow fadeInUp" data-wow-delay="0.3s">
              <div className="section-head">
                <h2 className="text-3xl font-bold mb-4">热门应用</h2>
                <p className="text-lg text-gray-700">
                  开发者们热衷的热门应用案例，可以通过 Serverless Devs 开发者工具快速体验
                </p>
              </div>
            </div>
            <div className="lg:w-3/12 md:w-6/12 wow fadeInUp" data-wow-delay="0.3s">
              <div className="link text-center md:text-right">
                <Link href="/application" className="main-btn bg-blue-500 text-white py-2 px-4 rounded">
                  查看所有应用案例
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mx-auto mt-8">
          <div className="flex justify-center">
            <div className="w-full wow fadeInUp" data-wow-delay="0.3s">
              {/* owl-carousel owl-theme */}
              <div className="totalfetaure owl-carousel owl-theme" id="itemlist"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured End */}

      {/* Testimonial Start */}
      {/* <div className="testomonial-two">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0.3s">
              <div className="section-head text-center">
                <h2 className="title">用户寄语</h2>
                <p className="text">
                  Serverless 社区开发者，对 Serverless Registry 说 ...
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-xl-end justify-content-center">
            <div className="col-xl-12 col-lg-12 wow fadeInUp">
              <div className="testotwo owl-carousel owl-theme">
                <div className="single">
                  <a className="icon" href="https://github.com/anycodes">
                    <img
                      style={{ width: '240px' }}
                      src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648812302258_20220401112502572485.png"
                      alt=""
                    />
                  </a>
                  <div className="content">
                    <div className="thumv">
                      <img src="static/picture/quate.png" alt="" />
                    </div>
                    <p className="text">
                      "Serverless Registry 是一个更为开放的平台，类似于 Python 的 Pypi，Node.js 的 NPM，都是生态基石的一部分。"
                    </p>
                    <div className="man">
                      <div className="content">
                        <h5 className="name">
                          <a href="#0"> Anycodes </a>
                        </h5>
                        <span className="position">Anycodes.cn 创始人</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single">
                  <a className="icon" href="https://github.com/qiuyu99627">
                    <img
                      style={{ width: '240px' }}
                      src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648812256705_20220401112423087042.png"
                      alt=""
                    />
                  </a>
                  <div className="content">
                    <div className="thumv">
                      <img src="static/picture/quate.png" alt="" />
                    </div>
                    <p className="text">
                      "如果说 Serverless 被称为是未来云计算的宠儿，那么我觉得 Serverless Registry 是伴随其成长的生态环境。"
                    </p>
                    <div className="man">
                      <div className="content">
                        <h5 className="name">
                          <a href="#0"> Qiuyu Chen </a>
                        </h5>
                        <span className="position">Nudt 学生</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single">
                  <a className="icon" href="#0">
                    <img
                      style={{ width: '240px' }}
                      src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648812391399_20220401112632053766.png"
                      alt=""
                    />
                  </a>
                  <div className="content">
                    <div className="thumv">
                      <img src="static/picture/quate.png" alt="" />
                    </div>
                    <p className="text">
                      "从 Serverless Devs 到 Serverless Registry，Serverless 的开源生态正在不断的完善，不断的丰富起来。"
                    </p>
                    <div className="man">
                      <div className="content">
                        <h5 className="name">
                          <a href="#0"> Jessie </a>
                        </h5>
                        <span className="position"> Serverless 爱好者</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single">
                  <a
                    className="icon"
                    href="https://avatars.githubusercontent.com/u/5129967?v=4"
                  >
                    <img
                      style={{ width: '240px' }}
                      src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648812493596_20220401112813906064.png"
                      alt=""
                    />
                  </a>
                  <div className="content">
                    <div className="thumv">
                      <img src="static/picture/quate.png" alt="" />
                    </div>
                    <p className="text">
                      "Serverless Devs Model 是一套基础规范，Devs 和 Registry 都是这套规范的最佳实践，也是面向未来的一种渴望。"
                    </p>
                    <div className="man">
                      <div className="content">
                        <h5 className="name">
                          <a href="#0"> heimanba </a>
                        </h5>
                        <span className="position">Serverless Devs 贡献者</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Testimonial End */}

      {/* Blog-two Start */}
      <section className="blog-two py-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="lg:w-7/12 md:w-7/12 wow fadeInUp">
              <div className="section-head">
                <h2 className="text-3xl font-bold mb-4">最佳事件案例与文档</h2>
                <p className="text-lg text-gray-700">
                  通过最佳实践，可以快速开发、贡献 Serverless Package
                </p>
              </div>
            </div>
            <div className="lg:w-3/12 md:w-5/12 wow fadeInUp">
              <div className="link text-center md:text-right">
                <Link href="docs.html" className="main-btn bg-blue-500 text-white py-2 px-4 rounded">
                  查看全部文档
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="lg:w-7/12 wow fadeInUp" data-wow-delay="0.3s">
              <div className="blog-box border rounded-lg p-4">
                <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/439" className="thumb">
                  <img
                    src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648813335712_20220401114218504973.png"
                    alt=""
                    className="w-full rounded-lg"
                  />
                </Link>
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
                    <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/439">
                      快速完成 Serverless Devs 应用开发并发布到 Registry
                    </Link>
                  </h5>
                  <div className="last-part mt-4 flex justify-end">
                    <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/439" className="text-blue-500 flex items-center">
                      阅读详情
                      <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 flex flex-col justify-between mt-8 lg:mt-0 space-y-4">
              <div className="right-box wow fadeInUp">
                <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/readme.md" className="flex items-start">
                  <img
                    style={{ width: '100px' }}
                    src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814061808_20220401115422201406.png"
                    alt=""
                    className="rounded-lg"
                  />
                  <div className="right-part ml-4">
                    <div className="date text-gray-600 text-sm">2021.06</div>
                    <h6 className="text-lg font-semibold mt-2">
                      <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/readme.md">
                        什么是 Serverless Devs ？
                      </Link>
                    </h6>
                    <div className="last-part mt-2">
                      <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/readme.md" className="text-blue-500 flex items-center">
                        阅读更多
                        <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="right-box wow fadeInUp">
                <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md" className="flex items-start">
                  <img
                    style={{ width: '100px' }}
                    src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814119666_20220401115519778987.png"
                    alt=""
                    className="rounded-lg"
                  />
                  <div className="right-part ml-4">
                    <div className="date text-gray-600 text-sm">2022.04</div>
                    <h6 className="text-lg font-semibold mt-2">
                      <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md">
                        Serverless Devs Model 规范文档
                      </Link>
                    </h6>
                    <div className="last-part mt-2">
                      <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md" className="text-blue-500 flex items-center">
                        阅读更多
                        <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="right-box wow fadeInUp">
                <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/407" className="flex items-start">
                  <img
                    style={{ width: '100px' }}
                    src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814406516_20220401120006833466.png"
                    alt=""
                    className="rounded-lg"
                  />
                  <div className="right-part ml-4">
                    <div className="date text-gray-600 text-sm">2022.01</div>
                    <h6 className="text-lg font-semibold mt-2">
                      <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/407">
                        快速开发Serverless Package
                      </Link>
                    </h6>
                    <div className="last-part mt-2">
                      <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions/407" className="text-blue-500 flex items-center">
                        阅读更多
                        <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog End */}

      {/* Footer Area START */}
      <footer className="footer-area py-12 bg-gray-800 text-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="lg:w-1/3 md:w-1/2 mb-8 wow fadeInUp" data-wow-delay="0.2s">
              <div className="footer-box one">
                <div className="logo">
                  <h1 className="text-white">Serverless Registry</h1>
                </div>
                <p className="text-gray-400 mt-4">
                  Serverless Registry 是 Serverless Devs 社区的衍生品，遵循 Serverless Devs Model 规范，为打造 Serverless 生态基础，繁荣 Serverless 开源生态而努力。正在为成为好用的 Serverless 领域的 NPM，Pypi ... 而努力。
                </p>
                <div className="social mt-4 flex space-x-4">
                  <a href="https://github.com/serverless-devs/serverless-devs" className="text-gray-400 hover:text-white">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://gitee.com/serverless-devs/Serverless-Devs" className="text-gray-400 hover:text-white">
                    <i className="fab fa-git"></i>
                  </a>
                  <a href="https://www.serverless-devs.com" className="text-gray-400 hover:text-white">
                    <i className="fab fa-page4"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 mb-8 wow fadeInUp" data-wow-delay="0.3s">
              <div className="footer-box two">
                <h4 className="text-lg font-semibold mb-4">相关资源</h4>
                <ul className="footer-list space-y-2">
                  <li>
                    <Link href="about.html" className="text-gray-400 hover:text-white">关于我们</Link>
                  </li>
                  <li>
                    <Link href="https://github.com/serverless-devs/serverless-devs" className="text-gray-400 hover:text-white">Serverless Devs 仓库</Link>
                  </li>
                  <li>
                    <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md" className="text-gray-400 hover:text-white">SDM 规范文档</Link>
                  </li>
                  <li>
                    <Link href="https://github.com/Serverless-Devs/Serverless-Devs/discussions" className="text-gray-400 hover:text-white">Serverless Devs 社区</Link>
                  </li>
                  <li>
                    <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/CONTRIBUTORS.md" className="text-gray-400 hover:text-white">贡献者列表</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 mb-8 wow fadeInUp" data-wow-delay="0.4s">
              <div className="footer-box three">
                <h4 className="text-lg font-semibold mb-4">钉钉交流群</h4>
                <div className="footer-list">
                  <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814797378_20220401120637498673.png" className="w-24" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 mb-8 wow fadeInUp" data-wow-delay="0.5s">
              <div className="footer-box none">
                <h4 className="text-lg font-semibold mb-4">微信公众号</h4>
                <div className="footer-list">
                  <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648814758343_20220401120558862369.png" className="w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">Copyright &copy; 2022. Serverless Devs</p>
        </div>
      </div>

      {/* Footer Area END */}

      {/* Back to top start */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg">
        <a href="#0" className="flex items-center justify-center h-full w-full">
          <FontAwesomeIcon icon={faArrowUp} />
        </a>
      </div>
      {/* Back to top end */}
    </div>
  );
};

export default HomePage;