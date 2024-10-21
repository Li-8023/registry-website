import Header from "../components/Header";
import { FC } from "react";

const SearchPage: FC = () => {
  return (
    <div>
      <Header />

      {/* Banner start */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            <h2 className="breadd wow fadeInUp">搜索词: </h2>
            <ul className="breadcrumb-list wow fadeInUp">
              <li>
                <a href="index.html">首页 /</a>
              </li>
              <li>搜索结果</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Banner end */}
    </div>
  );
};

export default SearchPage;
