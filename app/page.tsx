"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faUser, faArrowRight, faArrowUp, faFire, faDesktop } from '@fortawesome/free-solid-svg-icons';
import '../app/responsive.css';
import '../app/style.css';
import BlogSection from './components/main/BlogSection';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSearch]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = (event.currentTarget.elements.namedItem('keyword') as HTMLInputElement).value;
    router.push(`/resource?search=${keyword}`);
  };

  return (
    <div>
      <Header />

       {/* Banner */}
      <section className="banner two">
        <div className="container">
          <div className="flex justify-center">
            <div className="lg:w-10/12 wow fadeInUp" data-wow-delay="0.3s">
              <div className="banner-content text-center">
                <h1 className="text-6xl font-bold text-white">Serverless Registry</h1>
                <p className="text-lg mt-5 mb-2 text-white">
                  Serverless 包管理平台：让你像使用手机一样玩转 Serverless 架构
                </p>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="form-group flex items-center mt-4">
                    <input
                      type="text"
                      placeholder="搜索 Package ..."
                      className="form-control pr-10 p-2 border border-gray-300 rounded w-full"
                      name="keyword"
                    />
                    <button type="submit" className="absolute right-0 pr-3 flex items-center text-gray-500 bg-transparent border-none cursor-pointer">
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
                  <img src="/picture/choose-1.png" alt="Choose 1" className="mx-auto" />
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
                  <img src="/picture/choose-2.png" alt="" className="mx-auto" />
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
                  <img src="/picture/choose-3.png" alt="" className="mx-auto" />
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
                  <img src="/picture/choose-4.png" alt="" className="mx-auto" />
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
      {/* <section className="feature item three py-12">
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
    </section> */}

      {/* <section className="feature item three py-12">
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
              <div className="totalfetaure owl-carousel owl-theme" id="itemlist"></div>
            </div>
          </div>
        </div>
      </section> */}

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

      <BlogSection />

      {/* Footer Area START */}
      <Footer />

      {/* Back to top start */}
      {/* <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg">
        <a href="#0" className="flex items-center justify-center h-full w-full">
          <FontAwesomeIcon icon={faArrowUp} />
        </a>
      </div> */}
      {/* Back to top end */}
    </div>
  );
};

export default HomePage;