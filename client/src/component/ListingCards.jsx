import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

function ListingCards({listing}) {
  return (
    <Link to={`/listing/${listing._id}`}>
        <div className='bg-transparent border-2 border-orange-400 shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full sm:w-[330px] cursor-pointer'>
                <img src={listing.imageURLs[0]} alt="Picture" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-lg'/>
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='text-lg text-orange-400 font-semibold truncate'>{listing.name}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className='h-6 w-6 text-orange-400'/>
                    <p className='truncate text-sm text-orange-400'>{listing.address}</p>
                </div>
                <p className='text-sm text-orange-400 line-clamp-2'>{listing.description}</p>
                <p className='text-orange-400'>
                    $
                    {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && '/month'}
                </p>
                <div>
                    <div className="font-bold text-xs">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds `: `${listing.bedrooms} bed`}
                    </div>
                    <div className="font-bold text-xs">
                        {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms `: `${listing.bathrooms} bathroom`}
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ListingCards;