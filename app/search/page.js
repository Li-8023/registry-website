import Header from "../components/Header";
const SearchPage = () => {
  return (
    <div>
      <Header />

      {/* Banner start */}
      <section class="breadcrumb-area">
        <div class="container">
          <div class="content">
            <h2 class="breadd wow fadeInUp">搜索词: </h2>
            <ul class="breadcrumb-list wow fadeInUp">
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
