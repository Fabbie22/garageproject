import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welkom, hier kan je alle afspraken maken, ga naar afspraken om te beginnen. Voordat je een afspraak maakt, moet je eerst een voertuig toevoegen. Bij de sectie afspraken kan je dan een afspraak maken. Na een afspraak krijg je een factuur, deze word aangemaakt zodra je de afspraak hebt, nadat de monteur alles heeft toegevoegd kan je hem echt gaan betalen en downloaden voor je administratie
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
