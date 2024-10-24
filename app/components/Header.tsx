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
      className={`header-two navbar sticky-top sticky-header z-10 p-3 ${
        isSticky ? "sticky-on" : ""
      }`}
    >
    {/* <header
      className={`header-two navbar sticky-header  z-10 p-3`}
    > */}
      <div className="container-fluid">
        <div className="container mx-auto flex items-center justify-between container-1470">
          {/* Left Section with Logo */}
          <div className="header-left">
            <img
              src="../image/logo.svg" 
              alt="Serverless Registry Logo"
              className="w-30 h-auto"
            />
          </div>

          {/* Middle Section with Navigation Buttons */}
          <div className="header-center flex items-center space-x-4">
            <Link href="/devs" className="nav-link text-white">
              Devs
            </Link>
            <span className="text-white">|</span>
            <Link href="/resource" className="nav-link text-white">
              资源
            </Link>
            <span className="text-white">|</span>
            <Link href="/" className="nav-link text-white">
              主页
            </Link>
            <span className="text-white">|</span>
            <Link href="/faq" className="nav-link text-white">
              FAQ
            </Link>
          </div>

          {/* Right Section with Buttons */}
          <div className="header-right flex items-center space-x-4">
            <button className="nav-btn text-white border border-white rounded px-3 py-1 bg-transparent hover:bg-white hover:text-gray-800">
              EN
            </button>
            <button className="nav-btn text-white border border-white rounded px-3 py-1 bg-transparent hover:bg-white hover:text-gray-800">
              ZH
            </button>
            <button
              className="nav-btn text-white border border-white rounded px-3 py-1 bg-transparent hover:bg-white hover:text-gray-800"
              onClick={toggleSearch}
            >
              Search
            </button>
            <button className="nav-btn text-white border border-white rounded px-3 py-1 bg-transparent hover:bg-white hover:text-gray-800">
              <a
                href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.2/serverless_registry_model/readme.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                GITHUB
              </a>
            </button>

            {/* Search Overlay */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
