import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Vehicles({ personalVehicles }) {
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
        delete: destroy,
    } = useForm({
        model: "",
        type: "",
        kenteken: "",
    });

    const handleDelete = (id) => {
        setConfirmDeleteId(id);
    };

    const confirmDelete = () => {
        destroy(route("vehicles.delete", confirmDeleteId));
        setConfirmDeleteId(null);
    };

    console.log(data);

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        } else {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("vehicles.store"), {
            onSuccess: () => {
                reset("model", "type", "kenteken");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Voertuigen
                </h2>
            }
        >
            <Head title="Voertuigen" />
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                <div className="lg:w-1/2 mt-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        Voertuig toevoegen
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel htmlFor="model" value="Model" />

                            <TextInput
                                id="model"
                                name="model"
                                value={data.model}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("model", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.model}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="type" value="Type" />

                            <TextInput
                                id="type"
                                name="type"
                                value={data.type}
                                className="mt-1 block w-full"
                                autoComplete="type"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="kenteken" value="Kenteken" />

                            <TextInput
                                id="kenteken"
                                name="kenteken"
                                value={data.kenteken}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("kenteken", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.kenteken}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Voertuig toevoegen
                        </PrimaryButton>
                    </form>
                </div>
            </div>

            <div className="flex justify-center mt-16">
                <h2 className="text-2xl font-semibold mb-4">Jouw voertuigen</h2>
            </div>
            <div className="flex justify-center">
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Kenteken</th>
                            <th>Verwijder (oud) voertuig</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personalVehicles.length === 0 ? (
                            <tr>
                                <td colSpan="8">No appointments found</td>
                            </tr>
                        ) : (
                            personalVehicles.map((appt) => (
                                <tr key={appt.id}>
                                    <td>{appt.model}</td>
                                    <td>{appt.type}</td>
                                    <td>{appt.kenteken}</td>
                                    <td>
                                        <PrimaryButton
                                            onClick={() =>
                                                handleDelete(appt.id)
                                            }
                                            className="w-full bg-red-500 justify-center"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </PrimaryButton>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                show={confirmDeleteId !== null}
                onClose={() => setConfirmDeleteId(null)}
                maxWidth="lg"
            >
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">
                        Bevestig verwijdering
                    </h2>
                    <p>Weet je zeker dat je je voertuig wilt verwijderen?</p>
                    <div className="mt-6 flex justify-end gap-4">
                        <PrimaryButton
                            className="bg-gray-400"
                            onClick={() => setConfirmDeleteId(null)}
                        >
                            Annuleren
                        </PrimaryButton>
                        <PrimaryButton
                            className="bg-red-600"
                            onClick={confirmDelete}
                        >
                            Ja, verwijder
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
