import Footer from "../components/Footer";
import Header from "../components/Header";
const ApplicationPage = () => {
  return (
    <div>
      <Header />

      {/* Banner start */}
      <section class="breadcrumb-area">
        <div class="container">
          <div class="content">
            <h2 class="breadd wow fadeInUp">应用 </h2>
            <ul class="breadcrumb-list wow fadeInUp">
              <li>
                <a href="/">首页 /</a>
              </li>
              <li>应用</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Banner end */}
      <div className="mb-14">

      </div>
      <Footer />
    </div>
  );
};

export default ApplicationPage;
