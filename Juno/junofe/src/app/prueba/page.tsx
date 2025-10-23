import dynamic from 'next/dynamic';
import styles from "../../app/page.module.css";


export default function Page() {

  const DynamicMap = dynamic(()=> import('../../components/newMap'), {
    loading: ()=> (
      <p>Loading map....</p>
    ),
    ssr: !!false
  });

    return (
        <div>
        <article className={styles.article}>
          <div className={styles.container}>
            <DynamicMap/>
          </div>
        </article>
      </div>    )
}