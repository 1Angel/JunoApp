import { PropertiesResponse } from "@/types";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { Metadata } from "next";
import MapMarker from "@/components/Marker";
import HouseCard from "@/components/Card";
import { PaginationWithLinks } from "@/components/Pagination";


export const metadata: Metadata = {
  title: "Juno - Welcome",
  description: "Welcome to Juno"
}

interface Props {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}

export default async function Page({ searchParams }: Props) {

  
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  
  const data = await fetch(`http://localhost:5036/api/properties?pageSize=20&pageNumber=${currentPage}`);
  const posts: PropertiesResponse = await data.json();
  console.log(params);
  console.log(currentPage);

  const DynamicMap
    = dynamic(() => import('../components/Map'), {
      loading: () => (
        <p>Loading map....</p>
      ),
      ssr: !!false
    });

  return (
    <div className="flex h-[calc(100vh-64px)] ">
      <div className="w-1/2 h-full">
        <DynamicMap zoom={8}>
          {
            posts.results.map((e) => (
              <MapMarker
                key={e.id}
                position={[e.latitude, e.longitude]}
                data={e}
              />
            ))
          }
        </DynamicMap>
      </div>

      <div className="w-1/2 h-full overflow-y-auto bg-gray-50 p-2">
        <h2 className="text-2xl font-semibold mb-4">Propiedades</h2>

        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
          {
            posts.results.map((i) => (
              <HouseCard data={i} key={i.id} />
            ))}
        </div>
        <div className="py-2">
          <PaginationWithLinks totalCount={posts.totalCount} page={currentPage} pageSize={posts.pageSize} />

        </div>
      </div>
    </div>
  )
}

