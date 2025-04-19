import Recentproducts from "../Recentproducts/Recentproducts";
import Slider from "../MainSlider/MainSlider";
import Slides from "../Slides/Slides";

export default function Home() {
  return (
    <>
      <Slider />
      <div className="container">
        <Slides />
      </div>
      <Recentproducts />
    </>
  );
}
