import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            address: user.address,
            zip_code: user.zip_code,
            city: user.city,
            country: user.country,
            phone_number: user.phone_number,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex md:flex-row flex-col gap-8">
                    <div className="md:w-[49%]">
                        <InputLabel htmlFor="first_name" value="Voornaam" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="first_name"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.first_name}
                        />
                    </div>
                    <div className="md:w-[49%]">
                        <InputLabel htmlFor="last_name" value="Achternaam" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="last_name"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.last_name}
                        />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col gap-8">
                    <div className="md:w-[49%]">
                        <InputLabel htmlFor="address" value="Adres" />

                        <TextInput
                            id="address"
                            className="mt-1 block w-full"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            required
                            isFocused
                            autoComplete="address"
                        />

                        <InputError className="mt-2" message={errors.address} />
                    </div>
                    <div className="md:w-[49%]">
                        <InputLabel htmlFor="zip_code" value="Postcode" />

                        <TextInput
                            id="zip_code"
                            className="mt-1 block w-full"
                            value={data.zip_code}
                            onChange={(e) =>
                                setData("zip_code", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="zip_code"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.zip_code}
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-8">
                    <div className="md:md:w-[49%]">
                        <InputLabel htmlFor="city" value="Plaats" />

                        <TextInput
                            id="city"
                            className="mt-1 block w-full"
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                            required
                            isFocused
                            autoComplete="city"
                        />

                        <InputError className="mt-2" message={errors.city} />
                    </div>
                    <div className="md:md:w-[49%]">
                        <InputLabel htmlFor="country" value="Land" />

                        <TextInput
                            id="country"
                            className="mt-1 block w-full"
                            value={data.country}
                            onChange={(e) => setData("country", e.target.value)}
                            required
                            isFocused
                            autoComplete="country"
                        />

                        <InputError className="mt-2" message={errors.country} />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-8">
                    <div className="md:md:w-[49%]">
                        <InputLabel
                            htmlFor="phone_number"
                            value="Telefoonnummer"
                        />

                        <TextInput
                            id="phone_number"
                            className="mt-1 block w-full"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="phone_number"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.phone_number}
                        />
                    </div>
                    <div className="md:md:w-[49%]">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
