import { BsArrowDownRightCircle } from "react-icons/bs";
import leaves from "../../assets/leaves-decorations.webp";
import { useNavigate } from "react-router";

const Banner = ({ catRef }) => {
  const navigate = useNavigate();

  return (
    <main className=" flex justify-between items-center py-1 mb-5  relative">
      <section className="max-w-xl mx-auto sm:mx-0  w-full py-2  lg:w-1/3">
        <h1 className="text-6xl  sm:text-7xl lg:text-8xl font-semibold  py-3 w-full ">
          Premium Items
        </h1>
        <p className="py-3 text-md  text-gray-600">
          Buy the best high-quality home decor items from us.
          <br />
          More than 100 types of assortment.
        </p>
        <section className="flex items-center">
          <button
            className="btn-primary text-sm md:text-base"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
          <button
            className="p-3 flex items-center"
            onClick={() =>
              catRef.current.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <span className="mx-2 text-sm md:text-base">Explore More</span>{" "}
            <BsArrowDownRightCircle className="text-lg" />
          </button>
        </section>
      </section>
      <section className="hidden w-1/2 lg:flex justify-end rounded-md">
        <img src={leaves} alt="bannerImg" className="w-1/2 h-full" />
      </section>
    </main>
  );
};

export default Banner;
