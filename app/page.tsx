// app/main/page.tsx
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div>
      {/* Preloader */}
      <div id="preloader" className="mt-10">
        <div className="loader-cubes">
          <div className="loader-cube1 loader-cube"></div>
          <div className="loader-cube2 loader-cube"></div>
          <div className="loader-cube4 loader-cube"></div>
          <div className="loader-cube3 loader-cube"></div>
        </div>
      </div>

      {/* Header */}
      <header className="header-two sticky-header">
        <div className="header-navigation py-2">
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="header-left">
              <h1 className="text-white">Serverless Registry</h1>
            </div>
            <div className="header-right d-flex align-items-center justify-end">
              <div className="site-nav-menu">
                <ul className="primary-menu d-flex space-x-4">
                  <li className="current">
                    <Link href="/" className="nav-link">首页</Link>
                  </li>
                  <li>
                    <Link href="/application" className="nav-link">应用</Link>
                  </li>
                  <li>
                    <Link href="/component" className="nav-link">组件</Link>
                  </li>
                  <li>
                    <Link href="/plugin" className="nav-link">插件</Link>
                  </li>
                  <li>
                    <Link href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.2/serverless_registry_model/readme.md" target="_blank" className="nav-link">规范</Link>
                  </li>
                  <li>
                    <Link href="/faq" className="nav-link">常见问题</Link>
                  </li>
                </ul>
                <a href="#0" className="nav-close"><FontAwesomeIcon icon="times" /></a>
              </div>
              <div className="header-extra d-flex align-items-center">
                <div className="search-widget">
                  <a href="#0" className="search-icon" onClick={toggleSearch}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                  </a>
                  {showSearch && (
                    <div className="search-form">
                      <form action="search.html" method="GET">
                        <input
                          type="search"
                          placeholder="请输入要搜索的 Serverless Package 关键词"
                          name="keyword"
                          className="form-control"
                        />
                      </form>
                      <a href="#0" className="search-close" onClick={toggleSearch}>
                        <FontAwesomeIcon icon="times" />
                      </a>
                    </div>
                  )}
                </div>
                <div className="offcanvas-widget d-none">
                  <div className="offcanvas-icon">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="nav-toggler">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="banner two">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 wow fadeInUp" data-wow-delay="0.3s">
              <div className="banner-content text-center">
                <h1 className="head">Serverless Registry</h1>
                <p className="text">
                  Serverless 包管理平台：让你像使用手机一样玩转 Serverless 架构
                </p>
                <form action="search.html" method="GET">
                  <div className="form-group d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="搜索 Package ..."
                      className="form-control"
                      name="keyword"
                    />
                    <button className="main-btn icon ml-2">
                      <FontAwesomeIcon icon="search" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
