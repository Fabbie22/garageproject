import DropdownForm from "@/Components/DropdownForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { format, formatDate } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

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

    console.log(personalAppointments);

    const { data, setData, post, errors, processing, reset } = useForm({
        date: dateFromUrl,
        vehicle: "",
        treatment: "",
        customer_note: "",
    });
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        } else if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

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

        const maxDailyHours = 32;

        const fullyBookedDays = Object.entries(dailyHours)
            .filter(([, hours]) => hours >= maxDailyHours)
            .map(([day]) => day);

        setBookedDates(fullyBookedDays);
    }, [appointments]);

    const maxDailyHours = 32;

    const bookedHoursForSelectedDate = selectedDate
        ? appointments
              .filter(
                  ({ date }) =>
                      format(new Date(date), "yyyy-MM-dd") === selectedDate
              )
              .reduce(
                  (total, appt) => total + (appt.treatment?.duration || 0),
                  0
              )
        : 0;

    const tileDisabled = ({ date, view }) => {
        if (view === "month") {
            const dateString = format(date, "yyyy-MM-dd");

            const isFullyBooked = bookedDates.includes(dateString);
            const isSunday = date.getDay() === 0; // Sunday

            return isFullyBooked || isSunday;
        }

        return false;
    };

    const onCalendarClickDay = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        setSelectedDate(formattedDate);
        setData("date", formattedDate);
    };

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const oneDayBeforeNow = new Date();
    oneDayBeforeNow.setDate(oneDayBeforeNow.getDate() - 1);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("appointments.store"), {
            onSuccess: () => {
                reset("date", "vehicle", "treatment", "customer_note");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Afspraken
                </h2>
            }
        >
            <Head title="Afspraken" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                    <div className="lg:w-1/2 flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold mb-4">
                            Beschikbaarheid
                        </h2>
                        <Calendar
                            tileDisabled={tileDisabled}
                            minDate={oneDayBeforeNow}
                            maxDate={oneYearFromNow}
                            onClickDay={onCalendarClickDay}
                            value={selectedDate ? new Date(selectedDate) : null}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">
                            Afspraak maken
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel htmlFor="date" value="Datum" />

                                <input
                                    type="text"
                                    id="date"
                                    name="date"
                                    placeholder="Selecteer datum uit de agenda"
                                    value={selectedDate || ""}
                                    readOnly
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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

                                    {treatments.map((treatment) => {
                                        const wouldExceed =
                                            bookedHoursForSelectedDate +
                                                (treatment.duration || 0) >
                                            maxDailyHours;
                                        return (
                                            <option
                                                value={treatment.id}
                                                key={treatment.id}
                                                disabled={wouldExceed}
                                            >
                                                {treatment.name} ({treatment.duration} uren)                                                     
                                                {wouldExceed
                                                        ? " Behandeling vol voor vandaag"
                                                        : ""}
                                            </option>
                                        );
                                    })}
                                </DropdownForm>
                            </div>
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
                                    placeholder="Vul hier je notitie in"
                                    isFocused={true}
                                    value={data.customer_note}
                                    onChange={(e) =>
                                        setData("customer_note", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.customer_note}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                className="mt-4"
                                disabled={processing}
                            >
                                Afspraak maken
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center mt-16">
                    <h2 className="text-2xl font-semibold mb-4">
                        Jouw afspraken
                    </h2>
                </div>
                <div className="flex justify-center">
                    <table border="1" cellPadding="8" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Monteur</th>
                                <th>Voertuig (Model / Type / Kenteken)</th>
                                <th>Behandeling</th>
                                <th>Datum</th>
                                <th>Status</th>
                                <th>Jouw notitie</th>
                                <th>Gewerkte uren</th>
                                <th>Factuur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personalAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="8">No appointments found</td>
                                </tr>
                            ) : (
                                personalAppointments.map((appt) => (
                                    <tr key={appt.id}>
                                        <td>{appt.mechanic !== null ? appt?.mechanic?.first_name + " " + appt?.mechanic?.last_name : "Er is geen monteur toegekend"}</td>
                                        <td>{`${appt.vehicle.model} ${appt.vehicle.type} (${appt.vehicle.kenteken})`}</td>
                                        <td>{appt.treatment.name}</td>
                                        <td>
                                            {formatDate(
                                                new Date(appt.date),
                                                "dd-MM-yyyy"
                                            )}
                                        </td>
                                        <td>{appt.status}</td>
                                        <td>{appt.customer_note || "-"}</td>
                                        <td>{appt.work_hours ?? "-"}</td>
                                        <td>
                                            <a href={`/dashboard/facturen`}>
                                                <PrimaryButton className="bg-blue-600">
                                                    Naar facturen
                                                </PrimaryButton>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
