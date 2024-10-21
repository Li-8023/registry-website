"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../responsive.css";
import "../style.css";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const router = useRouter();
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSearch]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = (event.currentTarget.elements.namedItem("keyword") as HTMLInputElement).value;
    router.push(`/resource?search=${keyword}`);
  };

  return (
    <header
      className={`header-two navbar sticky-top sticky-header z-10 p-4 ${
        isSticky ? "sticky-on" : ""
      }`}
    >
      <div className="container-fluid">
        <div className="container mx-auto flex items-center justify-between container-1470">
          <div className="header-left">
            <h1 className="text-white">Serverless Registry</h1>
          </div>
          <div className="header-right flex items-center justify-end space-x-10">
            <div className="site-nav-menu">
              <ul className="primary-menu flex space-x-10">
                <li className="current">
                  <Link href="/" className="nav-link text-white">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/resource" className="nav-link text-white">
                    资源
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
              <div className="search-widget relative">
                <a
                  href="#0"
                  className="search-icon text-gray-600 hover:text-gray-800"
                  onClick={toggleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </a>
                {showSearch && (
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      <a
                        href="#0"
                        className="text-white"
                        onClick={toggleSearch}
                      >
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                      </a>
                    </div>
                    <div className="relative">
                      <form onSubmit={handleSearchSubmit}>
                        <input
                          type="search"
                          placeholder="请输入要搜索的 Serverless Package 关键词"
                          name="keyword"
                          className="bg-transparent border border-white p-2 rounded w-96 text-white placeholder-white shadow-lg"
                        />
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <div className="offcanvas-widget hidden">
                <div className="offcanvas-icon flex flex-col space-y-1">
                  <span className="block w-5 h-0.5 bg-red"></span>
                  <span className="block w-5 h-0.5 bg-red"></span>
                  <span className="block w-5 h-0.5 bg-red"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
