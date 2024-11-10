import facebook from "/facebook_logo.png";
import twitter from "/twitter_logo.png";
import google from "/google_logo.png";

const SocialMedia = () => {
  const redes = [
    {
      id: 1,
      name: "facebook",
      img: facebook,
    },
    {
      id: 2,
      name: "twitter",
      img: twitter,
    },
    {
      id: 3,
      name: "google",
      img: google,
    },
  ];
  return (
    <>
      <div className="flex justify-center gap-3 mt-3">
        {redes.map((item) => (
          <button className="w-[50px] h-[50px] rounded-xl  overflow-hidden" key={item.id}>
            <img src={item.img} alt={item.name} />
          </button>
        ))}
      </div>
    </>
  );
};

export default SocialMedia;
