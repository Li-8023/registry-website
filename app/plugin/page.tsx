import Header from "../components/Header";
import React from "react";

const PluginPage: React.FC = () => {
  return (
    <div>
      <Header />

      {/* Banner start */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <h2 className="breadd wow fadeInUp">插件 </h2>
            <ul className="breadcrumb-list wow fadeInUp">
              <li>
                <a href="/">首页 /</a>
              </li>
              <li>插件</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Banner end */}
    </div>
  );
};

export default PluginPage;
