"use client";
import Image from "next/image";
import Layout from "@/components/layout";
import AddButton from "@/components/buttons/addButton";

const Gallery = () => {
  const ghostTourImages = [
    "/images/experience/img1.png",
    "/images/experience/img2.png",
    "/images/experience/img3.png",
    "/images/experience/img4.png",
    "/images/experience/img5.png",
    "/images/experience/img6.png",
  ];

  return (
    <>
      <Layout>
        <div className="py-24 bg-white justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="pb-16 text-center">
              <h2 className="text-clearGreen font-yesteryear text-4xl font-bold leading-loose pb-2.5">
                Our Gallery
              </h2>
              <p className="text-gray-500 text-lg leading-8">
                Discover the stories that haunt these streets, as our clients
                explore the eerie history during our exclusive ghost tours.
              </p>
            </div>
            <div className="carousel rounded-box md-shadow mt-4">
              {ghostTourImages.map((src, index) => (
                <div key={index} className="carousel-item">
                  <Image
                    src={src}
                    alt={`tour image ${index + 1}`}
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
          <AddButton align={"center"} bcolor={"bg-clearGreen"}>
            Book Now
          </AddButton>
        </div>
      </Layout>
    </>
  );
};

export default Gallery;
