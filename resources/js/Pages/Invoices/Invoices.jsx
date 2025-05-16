import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { formatDate } from "date-fns";

function Invoices({ allInvoices }) {
    console.log(allInvoices);
    return (
        <AuthenticatedLayout>
            <Head title="Facturen"/>
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
                            <th>Factuur</th>
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
                                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
                                        >
                                            Factuur downloaden
                                        </a>
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
