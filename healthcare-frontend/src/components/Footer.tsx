export default function Footer() {
    return (

        <footer className="bg-slate-900 text-white mt-20">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-4 gap-10">

                    <div>

                        <h2 className="text-2xl font-bold">
                            HealthOpz
                        </h2>

                        <p className="mt-4 text-slate-300">

                            Africa's Healthcare Operations Platform connecting hospitals,
                            doctors, nurses and patients.

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-3">

                            Platform

                        </h3>

                        <ul className="space-y-2 text-slate-300">

                            <li>Hospitals</li>

                            <li>Doctors</li>

                            <li>Nurses</li>

                            <li>Patients</li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-3">

                            Company

                        </h3>

                        <ul className="space-y-2 text-slate-300">

                            <li>About</li>

                            <li>Careers</li>

                            <li>Privacy</li>

                            <li>Terms</li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-3">

                            Contact

                        </h3>

                        <p className="text-slate-300">

                            support@healthopz.com

                        </p>

                    </div>

                </div>

                <div className="border-t border-slate-700 mt-10 pt-5 text-center text-slate-400">

                    © {new Date().getFullYear()} HealthOpz.
                    All rights reserved.

                </div>

            </div>

        </footer>

    );
}