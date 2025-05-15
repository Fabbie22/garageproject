import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Appointments({ appointments }) {
    const { url } = usePage();
    const fullUrl = new URL(url, window.location.origin);
    const params = new URLSearchParams(fullUrl.search);
    const dateFromUrl = params.get('date');
    const [bookedDates, setBookedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dateFromUrl || '');

    const { data, setData } = useForm({
      date: dateFromUrl,
    });

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

    const onCalendarClickDay = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        setSelectedDate(formattedDate);
        setData('date', formattedDate);
        router.visit(`/dashboard/afspraken?date=${formattedDate}`);
    };

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const oneYearBeforeNow = new Date();
    oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);

    return (
        <AuthenticatedLayout>
            <Head title="Welkom" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">
                            Beschikbaarheid
                        </h2>
                        <Calendar
                            tileDisabled={tileDisabled}
                            minDate={oneYearBeforeNow}
                            maxDate={oneYearFromNow}
                            onClickDay={onCalendarClickDay}
                            value={selectedDate ? new Date(selectedDate) : null}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div>
                        <form>
                            <div>
                                <InputLabel
                                    htmlFor="first_name"
                                    value="Voornaam"
                                />

                                <DateInput
                                id="date"
                                name="date"
                                value={data.date}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                />


                                {/* <InputError
                                    message={errors.first_name}
                                    className="mt-2"
                                /> */}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
