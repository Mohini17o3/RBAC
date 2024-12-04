import Link from "next/link";
import Navbar from "./components/Navbar";
import { motion } from "motion/react" ;


export default function Home() {
    return (
        <>
            <Navbar />
            <div className="pt-16 bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 h-screen">

                <header className="text-center py-16 px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-purple-700">
                        Simplified Role-Based Access Control
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-purple-600 max-w-3xl mx-auto">
                        Manage user roles, permissions, and access levels effortlessly with our powerful RBAC solution.
                    </p>
                    <div className="mt-6 space-x-4">
                    <Link href="/SignUp">
                        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
                            Get Started
                        </button>
                    </Link>                        
                        <button className="bg-purple-100 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-200 transition">
                            Learn More
                        </button>
                    </div>
                </header>

                <section className="py-16 px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700">
                        Why Choose Our RBAC Solution?
                    </h2>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-center text-purple-700">Granular Permissions</h3>
                            <p className="mt-2 text-center text-purple-600">
                                Assign permissions at the user, role, or group level with complete control.
                            </p>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-center text-purple-700">User-Friendly Interface</h3>
                            <p className="mt-2 text-center text-purple-600">
                                Intuitive and easy-to-use interface for seamless management of roles and users.
                            </p>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-center text-purple-700">Scalable and Secure</h3>
                            <p className="mt-2 text-center text-purple-600">
                                Built with enterprise-grade security and scalability in mind.
                            </p>
                        </div>
                    </div>
                </section>

                <footer className="py-12 bg-purple-700 text-center text-white">
                    <h3 className="text-2xl md:text-3xl font-bold">
                        Ready to Take Control of Access?
                    </h3>
                    <p className="mt-2 text-lg">
                        Start your free trial today or contact us for more information.
                    </p>
                    <Link href="/SignUp">

                    <button className="mt-4 bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-100 transition">
                        Get Started
                    </button>
                    </Link>
                </footer>
            </div>
        </>
    );
}
