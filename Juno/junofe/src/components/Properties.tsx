import { PropertiesResponse } from "@/types";
import HouseCard from "./Card";
import Link from "next/link";

export default async function Properties() {

    const data = await fetch(`http://localhost:5036/api/properties?pageSize=3&pageNumber=1&homestatus=FOR_SALE&minimumPrice=1000&maximumPrice=30000`);
    const properties: PropertiesResponse = await data.json();

    return (
        <section className="py-16 sm:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Properties</h2>
                    <p className="text-lg text-muted-foreground">Handpicked homes just for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(properties.results.map((e)=>(
                        <HouseCard key={e.id} data={e}/>
                    )))}
                </div>

                <div className="text-center mt-12">
                    <Link href={"/properties?page=1&homestatus=FOR_SALE&minPrice=1000&maxPrice=30000"} className="rounded bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 h-auto text-base">
                        Ver Todas las propiedades
                    </Link>
                </div>
            </div>
        </section>
    )
}