import pcLog from "../../assets/pc.svg";
import secureSend from "../../assets/secure-send.svg";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center w-full h-auto m-auto">
      <div className="flex items-center justify-center p-10">
        <h1 className="text-5xl">
          The best way to protect and keep yours passwords safety!
        </h1>
      </div>
      <div className="flex items-center justify-between p-10">
        <img src={pcLog} />
        <div className="mx-96 flex flex-wrap w-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end w-auto p-10">
        <div className="mx-96">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
        </div>
        <img src={secureSend} />
      </div>
    </div>
  );
}
