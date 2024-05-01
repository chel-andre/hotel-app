import { useNavigate, useParams } from 'react-router-dom';
import BookingSvc from '../services/bookingService';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';

const BookingUpdatingPage = () => {
    const navigate = useNavigate();
    const bookingSchema = yup.object({
        checkInDate: yup.date().required('Check in date is required'),
        checkOutDate: yup.date().required('Check out date is required'),
        childCount: yup.number().required('Number of child is required').min(0),
        adultCount: yup.number().required('Number of adult is required').min(1, 'Number of adult cannot be less than 1'),
    });
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit, reset, control } = useForm({
        resolver: yupResolver(bookingSchema),
    });
    const getData = async (id: string) => {
        try {
            const response = await BookingSvc.getSingleBooking(id);
            const data = response?.data.data;
            reset({ adultCount: data.adultCount, childCount: data.childCount });
        } catch (error) {
            if(isAxiosError(error)) {
                toast.error(error?.response?.data.message);
            }
        }
    };

    useEffect(() => {
        getData(id as string);
    },[]);

    const bookingHandler = async(data: FieldValues) => {
        try {
            const response = await BookingSvc.updateBooking(id as string, data);
            toast.success(response?.data.message);
            navigate('/booking');
        } catch (error) {
            if(isAxiosError(error)) {
                toast.error(error?.response?.data.message);
            }
        }
    };

    return (
        <div className="container h-[80vh] mx-auto mt-8 p-8 border rounded shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Update Your booking</h2>
            <form onSubmit={handleSubmit(bookingHandler)}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label
            htmlFor="checkInDate"
            className="block text-sm font-medium text-gray-700"
                        >
            Check-In Date
                        </label>

                        <Controller
            control={control}
            name="checkInDate"
            render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholderText="Check in Date"
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                selected={value}

                />
            )}
                        />
                        {errors.checkInDate && <span className="text-red-700">{errors?.checkInDate.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label
            htmlFor="checkOutDate"
            className="block text-sm font-medium text-gray-700"
                        >
            Check-Out Date
                        </label>
                        <Controller
            control={control}
            name="checkOutDate"
            render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholderText="Check out Date"
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                selected={value}
                />
            )}
                        />
                        {errors.checkOutDate && <span className="text-red-700">{errors?.checkOutDate.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label
            htmlFor="adultCount"
            className="block text-sm font-medium text-gray-700"
                        >
            Adults
                        </label>
                        <input
            type="number"
            id="adultCount"
            min="1"
            {...register('adultCount')}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.adultCount && <span className="text-red-700">{errors?.adultCount.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label
            htmlFor="childCount"
            className="block text-sm font-medium text-gray-700"
                        >
            Children
                        </label>
                        <input
            type="number"
            id="childCount"
            min="0"
            {...register('childCount')}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.childCount && <span className="text-red-700">{errors?.childCount.message}</span>}
                    </div>
                </div>
                <div className="mt-6">
                    <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300" id="Update-Booking"
                    >
          Update Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingUpdatingPage;
