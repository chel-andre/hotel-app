
import {useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'

const BookingCreatingPage = () => {
  
  const [searchParams] = useSearchParams();
   const hotelId = searchParams.get("hotelId");
  const pricePerNight = Number(searchParams.get("pricePerNight"));
  const childCount = Number(searchParams.get("childCount"));
  const adultCount = Number(searchParams.get("adultCount"));

  
  return (
    <div className='h-[70vh] flex justify-center items-center p-10'>
        <BookingForm pricePerNight={pricePerNight as number} hotelId={hotelId as string} childCount={childCount} adultCount={adultCount}/>
    </div>
  )
}

export default BookingCreatingPage