import { PropertiesResponse } from "@/types";
import dynamic from "next/dynamic";
import styles from "./page.module.css";


export default async function Page(){

  const data = await fetch('http://localhost:5036/api/properties?pageSize=20&pageNumber=1');
  const posts: PropertiesResponse = await data.json();


  const DynamicMap = dynamic(()=> import('../components/Map'), {
    loading: ()=> (
      <p>Loading map....</p>
    ),
    ssr: !!false
  });


  return (
    <div>
      <div>
        <article className={styles.article}>
          <div className={styles.container}>
            <DynamicMap results={posts.results} pageNumber={posts.pageNumber} pageSize={posts.pageSize} totalCount={posts.totalCount}/>
          </div>
        </article>
      </div>
      <ul>
        {posts.results.map((e)=>(
          <li key={e.id}>{e.price
          }</li>
        ))}
      </ul>
    </div>
  )
}