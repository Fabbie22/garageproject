import Review from "@/Components/Review";
import SiteLayout from "@/Layouts/SiteLayout";
import { Head } from "@inertiajs/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home({ reviews }) {
    console.log(reviews);

    return (
        <SiteLayout>
            <Head title="Welcome" />
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
                className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
            >
                {reviews.map((review) => (
                    <Review key={review.id} review={review} />
                ))}
            </Carousel>
        </SiteLayout>
    );
}
