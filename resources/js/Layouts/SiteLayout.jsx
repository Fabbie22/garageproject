import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage } from "@inertiajs/react";

export default function SiteLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-stretch justify-start">
                            <div className="flex shrink-0 items-center">
                                <FontAwesomeIcon
                                    className="h-8 w-auto text-white"
                                    icon={faWarehouse}
                                />
                                <p className="text-white ml-4 text-2xl font-bold">
                                    Garage
                                </p>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">
                                <div className="text-white text-xl">
                                    {user ? (
                                        <Link href={route("dashboard")}>
                                            {user.first_name +
                                                " " +
                                                user.last_name}
                                        </Link>
                                    ) : (
                                        <Link href={route("login")}>
                                            Inloggen
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                {children}
            </div>
        </>
    );
}
