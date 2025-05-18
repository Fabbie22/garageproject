import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Star from "@/Components/Star";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Invoices({ allInvoices }) {
    console.log(allInvoices);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isAddingReview, setIsAddingReview] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        description: "",
        rating: 0,
    });

    const handlePay = (invoiceId) => {
        setIsReviewModalOpen(true);
        router.put(`/dashboard/facturen/${invoiceId}/pay`, {
            preserveScroll: true,
        });
    };

    const calculateTotal = (invoice) => {
        const laborRate = 80;
        const workHours = parseFloat(invoice.appointment.work_hours ?? 0);
        const laborCost = laborRate * workHours;

        const partsTotal = invoice.lineitems.reduce((sum, item) => {
            const price = parseFloat(item.part?.price ?? item.price ?? 0);
            return sum + price * item.quantity;
        }, 0);

        const subtotal = partsTotal + laborCost;
        const vat = subtotal * 0.21;
        const total = subtotal + vat;

        return total.toFixed(2);
    };

    const handleAddReview = (e) => {
        e.preventDefault();

        post(route("reviews.store"), {
            data,
        });
        setIsReviewModalOpen(false);
    };

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        } else {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <AuthenticatedLayout>
            <Head title="Facturen" />
            <div className="flex justify-center mt-16">
                <h2 className="text-2xl font-semibold mb-4">Jouw facturen</h2>
            </div>
            <div className="flex justify-center">
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Soort behandeling</th>
                            <th>Voertuig</th>
                            <th>Facturatie Datum</th>
                            <th>Betaald</th>
                            <th>Factuur downloaden</th>
                            <th>Factuur betalen</th>
                            <th>Totaal (incl. BTW)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allInvoices.length === 0 ? (
                            <tr>
                                <td colSpan="8">No appointments found</td>
                            </tr>
                        ) : (
                            allInvoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>
                                        {invoice.appointment.treatment.name}
                                    </td>
                                    <td>{invoice.vehicle.kenteken}</td>
                                    <td>
                                        {formatDate(
                                            new Date(invoice.invoice_date),
                                            "dd-MM-yyyy"
                                        )}
                                    </td>
                                    <td>{invoice.paid ? "Ja" : "Nee"}</td>
                                    <td>
                                        <a
                                            href={`/dashboard/facturen/${invoice.id}/pdf`}
                                            rel="noopener noreferrer"
                                        >
                                            <PrimaryButton
                                                disabled={
                                                    Object.keys(
                                                        invoice.lineitems
                                                    ).length < 1
                                                }
                                                className="bg-blue-600"
                                            >
                                                {Object.keys(invoice.lineitems)
                                                    .length < 1
                                                    ? "Factuur niet beschikbaar"
                                                    : "Factuur downloaden"}
                                            </PrimaryButton>
                                        </a>
                                    </td>
                                    <td>
                                        <PrimaryButton
                                            onClick={() =>
                                                handlePay(invoice.id)
                                            }
                                            disabled={
                                                invoice.paid ||
                                                Object.keys(invoice.lineitems)
                                                    .length < 1
                                            }
                                            className={
                                                invoice.paid
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : ""
                                            }
                                        >
                                            {invoice.paid
                                                ? "Betaald"
                                                : Object.keys(invoice.lineitems)
                                                      .length < 1
                                                ? "Factuur niet beschikbaar"
                                                : "Factuur betalen"}
                                        </PrimaryButton>
                                    </td>
                                    <td>€ {calculateTotal(invoice)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                show={isReviewModalOpen}
                onClose={() => {
                    setIsReviewModalOpen(false);
                }}
            >
                <div className="p-16">
                    {!isAddingReview ? (
                        <div>
                            <h2 className="text-lg font-bold mb-4">
                                Wil je een review toevoegen?
                            </h2>
                            <SecondaryButton
                                className="mr-5"
                                onClick={() => setIsReviewModalOpen(false)}
                            >
                                Annuleren
                            </SecondaryButton>
                            <PrimaryButton
                                onClick={() => setIsAddingReview(true)}
                            >
                                Ja, graag!
                            </PrimaryButton>
                        </div>
                    ) : (
                        <form onSubmit={handleAddReview}>
                            <h2 className="text-lg font-bold mb-4">
                                Review toevoegen
                            </h2>
                            <div className="mt-4">
                                <InputLabel htmlFor="rating" value="Rating" />
                                <div className="flex space-x-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            filled={star <= data.rating}
                                            onClick={() =>
                                                setData("rating", star)
                                            }
                                        />
                                    ))}
                                </div>
                                <InputError
                                    message={errors.rating}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <TextInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="type"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                disabled={processing}
                                className="mt-4"
                            >
                                Review toevoegen
                            </PrimaryButton>
                        </form>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

export default Invoices;
