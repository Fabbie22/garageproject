import Review from "@/Components/Review";
import SiteLayout from "@/Layouts/SiteLayout";
import { Head, Link, router } from "@inertiajs/react";
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
    const dailyHours = {};

    appointments.forEach(({ date, treatment }) => {
        const day = format(new Date(date), "yyyy-MM-dd");
        const duration = treatment?.duration || 0;
        dailyHours[day] = (dailyHours[day] || 0) + duration;
    });

    const maxDailyHours = 10;

    const fullyBookedDays = Object.entries(dailyHours)
        .filter(([, hours]) => hours >= maxDailyHours)
        .map(([day]) => day);

    setBookedDates(fullyBookedDays);
    }, [appointments]);

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
                    onClickDay={(date) => {
                        const formattedDate = format(date, "yyyy-MM-dd");
                        router.visit(`/dashboard?date=${formattedDate}`);
                    }}                
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
