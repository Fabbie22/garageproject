import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { formatDate } from "date-fns";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Invoices({ allInvoices }) {
    console.log(allInvoices);

    const handlePay = (invoiceId) => {
        router.put(
            `/dashboard/facturen/${invoiceId}/pay`,
            {},
            {
                preserveScroll: true,
            }
        );
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
                            <th>Voertuig</th>
                            <th>Datum</th>
                            <th>Betaald</th>
                            <th>Factuur downloaden</th>
                            <th>Factuur betalen</th>
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
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <PrimaryButton className="bg-blue-600">
                                                Factuur downloaden
                                            </PrimaryButton>
                                        </a>
                                    </td>
                                    <td>
                                        <PrimaryButton
                                            onClick={() =>
                                                handlePay(invoice.id)
                                            }
                                            disabled={invoice.paid}
                                            className={
                                                invoice.paid
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : ""
                                            }
                                        >
                                            {invoice.paid
                                                ? "Betaald"
                                                : "Factuur betalen"}
                                        </PrimaryButton>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

export default Invoices;
