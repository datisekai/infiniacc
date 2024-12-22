import BorderGradient from "../components/BorderGradient";
import DragonBallCard from "../components/Cards/DragonBallCard";
import { exampleImages } from "../constants";
import MaxWidthLayout from "../layouts/MaxWidthLayout";

const Home = () => {
  return (
    <MaxWidthLayout>
      <div className="space-y-2  animate-fade-down">
        <BorderGradient active={true} hoverBorderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)">
          <div className="px-4 py-4 text-center">
            <h2 className="text-gradient-secondary text-2xl mb-2">Chào mừng bạn đến với <span className="text-gradient-primary">Infiniacc</span></h2>
            <p>Đây là nơi trao đổi & tìm kiếm nick dễ dàng</p>
            <p className="text-gray-400 text-sm">Phát triển bởi <a href="https://www.facebook.com/datlt.dev/" target="_blank" className="italic underline">Datisekai</a> & <a href="https://www.facebook.com/profile.php?id=100011379491596" target="_blank" className="italic underline">Duc Anh Nguyen</a></p>
          </div>
        </BorderGradient>
        <DragonBallCard images={exampleImages} active={true} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
        <DragonBallCard images={exampleImages} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
      </div>
    </MaxWidthLayout>
  );
};

export default Home;
