import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCards from '../component/ListingCards';

function Home(params) {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation])
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data)
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data)
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);
  
  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-orange-400 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-orange-200">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-orange-300 text-xs sm:text-sm">
          Sonal Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm font-bold hover:underline text-orange-700"
        >
          Let's get started...
        </Link>
      </div>
      {/* Swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing) => 
            <SwiperSlide>
              <div className="h-[500px]" key={listing._id} style={{background: `url(${listing.imageURLs[0]}) center no-repeat`, backgroundSize:"cover"}}></div>
            </SwiperSlide>
          )
        }
      </Swiper>
      {/* Listing Offer, sale, ren */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-orange-400'>Recent Offer</h2>
                <Link to={'/search?offer=true'} className='hover:underline text-orange-400'>
                  Show More Offers....
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingCards listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-orange-400'>Recent places for rent</h2>
                <Link to={'/search?type=rent'} className='hover:underline text-orange-400'>
                  Show More places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingCards listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-orange-400'>Recent For Sale</h2>
                <Link to={'/search?type=sale'} className='hover:underline text-orange-400'>
                  Show More for Sale Places
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingCards listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Home;
