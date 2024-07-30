import Header from "../components/Header";
const PluginPage = () => {
  return (
    <div>
      <Header />

      {/* Banner start */}
      <section class="breadcrumb-area">
        <div class="container">
          <div class="content">
            <h2 class="breadd wow fadeInUp">插件 </h2>
            <ul class="breadcrumb-list wow fadeInUp">
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
