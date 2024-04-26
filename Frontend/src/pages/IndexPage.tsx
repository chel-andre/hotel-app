import { lazy, Suspense } from "react";
import Hero from "../sections/Hero";
import SearchBar from "../sections/SearchBar";
import Loader from "../components/loader/Loader";
import { Element } from "react-scroll";
const Featured = lazy(() => {
  return import("../sections/Featured");
});
const Service = lazy(() => {
  return import("../sections/Service");
});
const IndexPage = () => {

  return (
    <div>
      <Hero />
      <SearchBar />
      <Suspense
        fallback={
          <div className="h-[20vh] flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <Element name="service">
          <Service/>
        </Element>
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[20vh] flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <Element name="featured">
          <Featured />
        </Element>
      </Suspense>
    </div>
  );
};

export default IndexPage;
