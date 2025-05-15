import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-calendar/dist/Calendar.css";

import Review from "@/Components/Review";
import SiteLayout from "@/Layouts/SiteLayout";

export default function Home({ reviews, appointments }) {
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

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const oneYearBeforeNow = new Date();
    oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);

    return (
        <SiteLayout>
            <Head title="Welkom" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Beschikbaarheid</h2>
                        <Calendar
                            tileDisabled={tileDisabled}
                            minDate={oneYearBeforeNow}
                            maxDate={oneYearFromNow}
                            onClickDay={(date) => {
                                const formattedDate = format(date, "yyyy-MM-dd");
                                router.visit(`/dashboard?date=${formattedDate}`);
                            }}
                            className="rounded-lg shadow-md"
                        />
                    </div>

                    <div className="bg-white border border-gray-200 shadow-md p-8 rounded-lg lg:w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Maak een afspraak</h2>
                        <p className="mb-4 text-gray-600">Plan een afspraak voor uw voertuig:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>APK</li>
                            <li>Vakantiecheck</li>
                            <li>Grote beurt</li>
                            <li>Kleine beurt</li>
                            <li>Airco controle</li>
                            <li>Overige (Notitie achterlaten)</li>
                            <li>Bandenwissel</li>
                            <li>Wintercheck</li>
                        </ul>
                    </div>
                </div>
            </section>

            {reviews.length > 0 && (
                <section className="bg-gray-100 py-12">
                    <div className="max-w-5xl mx-auto px-72 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                            Klantbeoordelingen
                        </h2>
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop
                            autoPlay
                            interval={5000}
                            className="rounded-lg shadow-lg"
                        >
                            {reviews.map((review) => (
                                <Review key={review.id} review={review} />
                            ))}
                        </Carousel>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}
