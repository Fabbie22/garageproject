import DateInput from "@/Components/DateInput";
import DropdownForm from "@/Components/DropdownForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Appointments({
    appointments,
    treatments,
    personalAppointments,
    personalVehicles,
}) {
    const { url } = usePage();
    const fullUrl = new URL(url, window.location.origin);
    const params = new URLSearchParams(fullUrl.search);
    const dateFromUrl = params.get("date");
    const [bookedDates, setBookedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dateFromUrl);

    console.log(appointments);
    console.log(treatments);
    console.log(personalAppointments);
    console.log(personalVehicles);

    const { data, setData, post, errors } = useForm({
        date: dateFromUrl,
        vehicle: "",
        treatment: "",
        customer_note: "",
    });

    useEffect(() => {
        setSelectedDate(dateFromUrl);
        setData("date", dateFromUrl);
    }, [dateFromUrl]);

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

            const isFullyBooked = bookedDates.includes(dateString);
            const isSunday = date.getDay() === 0; // 0 = Sunday

            return isFullyBooked || isSunday;
        }

        return false;
    };

    const onCalendarClickDay = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        setSelectedDate(formattedDate);
        setData("date", formattedDate);
        router.visit(`/dashboard/afspraken?date=${formattedDate}`);
    };

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const oneYearBeforeNow = new Date();
    oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);

        post(route("appointments.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Afspraken" />

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
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel htmlFor="date" value="Datum" />

                                <DateInput
                                    id="date"
                                    name="date"
                                    value={data.date || ""}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setData("date", e.target.value);
                                    }}
                                />

                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <DropdownForm
                                    value={data.vehicle}
                                    onChange={(e) =>
                                        setData("vehicle", e.target.value)
                                    }
                                    id="vehicle"
                                    name="vehicle"
                                >
                                    <option value="">
                                        — Kies een voertuig —
                                    </option>

                                    {personalVehicles.map((vehicle) => (
                                        <option
                                            value={vehicle.id}
                                            key={vehicle.id}
                                        >
                                            {[
                                                [vehicle?.model, vehicle?.type]
                                                    .filter(Boolean)
                                                    .join(" "),
                                                vehicle?.kenteken,
                                            ]
                                                .filter(Boolean)
                                                .join(" / ")}
                                        </option>
                                    ))}
                                </DropdownForm>
                            </div>
                            <div>
                                <DropdownForm
                                    value={data.treatment}
                                    onChange={(e) =>
                                        setData("treatment", e.target.value)
                                    }
                                    id="treatment"
                                    name="treatment"
                                >
                                    <option value="">
                                        — Kies een behandeling —
                                    </option>

                                    {treatments.map((treatment) => (
                                        <option
                                            value={treatment.id}
                                            key={treatment.id}
                                        >
                                            {treatment.name}
                                        </option>
                                    ))}
                                </DropdownForm>
                            </div>
                            <div>
                                <div>
                                    <InputLabel
                                        htmlFor="customer_note"
                                        value="Notitie"
                                    />

                                    <textarea
                                        id="customer_note"
                                        name="customer_note"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        autoComplete="customer_note"
                                        isFocused={true}
                                        value={data.customer_note}
                                        onChange={(e) =>
                                            setData(
                                                "customer_note",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.customer_note}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <PrimaryButton>Afspraak maken</PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
