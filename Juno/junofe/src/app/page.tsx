import { PropertiesResponse } from "@/types";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import MapMarker from "@/components/Marker";
import HouseCard from "@/components/Card";
import { PaginationWithLinks } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";


export const metadata: Metadata = {
  title: "Welcome - Juno",
  description: "Welcome to Juno"
}

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    homestatus?: string
  }>
}

export default async function Page({ searchParams }: Props) {


  const params = await searchParams;
  const search = params?.search || '';
  const currentPage = Number(params?.page) || 1;
  const homeStatus = params?.homestatus || "FOR_RENT";

  const data = await fetch(`http://localhost:5036/api/properties?pageSize=20&pageNumber=${currentPage}&homestatus=${homeStatus}&search=${search}`);
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
    <div>
      <div className="py-3 px-4 border-b-1 border-black bg-white shadow-2xl">
        <SearchBar />
      </div>
      <div className="flex h-145">
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
            <PaginationWithLinks 
              totalCount={posts.totalCount} 
              page={currentPage} 
              pageSize={posts.pageSize} 
            />

          </div>
        </div>
      </div>
    </div>
  )
}

