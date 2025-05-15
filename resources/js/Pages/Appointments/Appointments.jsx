import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


export default function Appointments({appointments}) {
    const [bookedDates, setBookedDates] = useState([]);

    console.log(appointments);

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
    return <AuthenticatedLayout>
            <Head title="Welkom" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Beschikbaarheid</h2>
                        <Calendar
                            tileDisabled={tileDisabled}
                            minDate={oneYearBeforeNow}
                            maxDate={oneYearFromNow}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>
    </AuthenticatedLayout>
}
