import Section from "../../components/section";
import Texts from "../../texts.json";

export default function HomePage() {
  const infos = Texts.texts;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center h-1/6">
        <h1 className="flex flex-wrap text-5xl text-white">
          {infos.homePage.title}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center h-1/2">
        <Section
          title={infos.homePage.section1.title}
          text={infos.homePage.section1.text}
        />
      </div>
    </div>
  );
}
