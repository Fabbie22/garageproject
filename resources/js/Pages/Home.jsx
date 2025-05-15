import Review from "@/Components/Review";
import SiteLayout from "@/Layouts/SiteLayout";
import { Head } from "@inertiajs/react";
import Calendar from "react-calendar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Home({ reviews, appointments }) {
    console.log(reviews);
    console.log(appointments);

    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        // Convert appointment timestamps to 'YYYY-MM-DD'
        const cleanedDates = appointments.map(appointment =>
        format(new Date(appointment.date), "yyyy-MM-dd")
        );
        setBookedDates(cleanedDates);
    }, []);

    const tileDisabled = ({ date, view }) => {
        if (view === "month") {
            const dateString = format(date, "yyyy-MM-dd");
            return bookedDates.includes(dateString);
        }
        return false;
    };

    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    var oneYearBeforeNow = new Date();
    oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);

    return (
        <SiteLayout>
            <Head title="Welcome" />
            <div>
                <Calendar
                    tileDisabled={tileDisabled}
                    minDate={oneYearBeforeNow}
                    maxDate={oneYearFromNow}
                />
            </div>
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
