import ImagesCarousel from "@/components/ImagesCorousel";
import { EmblaOptionsType } from 'embla-carousel'
import '../../styles/carousel.css';

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const images = [
    {
        image: "https://picsum.photos/id/1018/1000/600/"
        
    }
]

export default function page(){
    return <>
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-500">
                <p>logo</p>
            </div>
            <div className="bg-red-400">
                <p>Nav links</p>
            </div>
            <div className="bg-orange-500">
                <p>Dropdown</p>
            </div>
        </div>
        <div className="relative w-full max-w-3xl mx-auto h-[400px]">
            <ImagesCarousel slides={SLIDES} options={OPTIONS}/>
        </div>
    </>
}