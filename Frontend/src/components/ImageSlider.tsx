
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

interface propType{
  image: string[];
}


const ImageSlider = ({image}: propType) => {
    // const image = [heroImage, heroImage, heroImage]
  return (
    <div>
        <Fade>
        {image?.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%'}} src={fadeImage} className="h-[320px] md:h-[500px]"/>
          </div>
        ))}
      </Fade>
    </div>
  )
}

export default ImageSlider;