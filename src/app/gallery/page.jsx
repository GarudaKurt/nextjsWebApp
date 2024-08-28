"use client";
import Image from 'next/image';
import Layout from '@/components/layout';
import AddButton from '@/components/buttons/addButton';

const Gallery = () => {

    return (
        <>
            <Layout>
                <div className="py-24 bg-white justify-center">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
                        <div className="pb-16 text-center">
                            <h2 className="text-gray-900 text-4xl font-bold leading-loose pb-2.5">
                                Our Gallery
                            </h2>
                            <p className="text-gray-600 text-lg leading-8">
                                Discover the stories that haunt these streets, as our clients explore the eerie history during our exclusive ghost tours.
                            </p>
                        </div>
                        <div className="carousel rounded-box md-shadow">
                            <div className="carousel-item">
                                <Image
                                    src={"/images/tour/me.png"}
                                    alt='tour'
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={"/images/tour/pic_1.png"}
                                    alt='tour'
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={"/images/tour/pic_2.png"}
                                    alt='tour'
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={"/images/tour/pic_3.png"}
                                    alt='tour'
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={"/images/tour/pic_4.png"}
                                    alt='tour'
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                    <AddButton align={"center"}>Book Now</AddButton>
                </div>
            </Layout>
        </>
    );
};

export default Gallery;
