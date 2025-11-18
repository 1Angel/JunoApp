import { Home } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-8 h-8 bg-red-700 rounded-md flex items-center justify-center">
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <span className="hidden sm:inline text-xl font-bold text-white">Juno</span>
                        </div>
                        <p className="text-background/70 text-sm">
                            Your trusted platform for finding the perfect home.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm text-background/70">
                            <li><a href="#" className="hover:text-background transition-colors">Buy</a></li>
                            <li><a href="#" className="hover:text-background transition-colors">Sell</a></li>
                            <li><a href="#" className="hover:text-background transition-colors">Rent</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-background/70">
                            <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-background/70">
                            <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-background transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/20 pt-8">
                    <p className="text-center text-sm text-background/70">
                        © 2025 PropertyHub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}