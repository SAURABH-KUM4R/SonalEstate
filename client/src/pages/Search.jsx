import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCards from '../component/ListingCards';
//Revise it again.
function Search() {
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const navigate = useNavigate();
    const [loading,setLoading] = useState();
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false)
    const handleChange = (e) => {
        if (e.target.id == 'all' || e.target.id == 'rent' || e.target.id == 'sale') {
            setSideBarData({...sideBarData, type: e.target.id})
        }

        if (e.target.id == 'searchTerm') {
            setSideBarData({...sideBarData, searchTerm: e.target.value})
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarData({...sideBarData, [e.target.id]: e.target.checked || e.target.checked == 'true' ? true:false})
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSideBarData({...sideBarData, sort, order});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlPrams = new URLSearchParams();

        urlPrams.set('searchTerm', sideBarData.searchTerm)
        urlPrams.set('type', sideBarData.type)
        urlPrams.set('parking', sideBarData.parking)
        urlPrams.set('furnished', sideBarData.furnished)
        urlPrams.set('offer', sideBarData.offer)
        urlPrams.set('sort', sideBarData.sort)
        urlPrams.set('order', sideBarData.order);
        
        const searchQuery = urlPrams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
        if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
        ) {
        setSideBarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
        });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length >= 9) {
                setShowMore(true);
            }else {
                setShowMore(false)
            }
            setListings(data);
            setLoading(false);
        }
        fetchListings();
    }, [location.search]);

    const onShowMoreClick = async () => {
        const numberOfLIsting = listings.length;
        const startIndex = numberOfLIsting
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings, ...data ]);
    }
  return (
    <div className='flex flex-col md:flex-row'>
        {/* Search Term */}
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap text-orange-400'>Search Term:</label>
                    <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' value={sideBarData.searchTerm} onChange={handleChange}/>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='text-orange-400'>Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="all" className='w-5' onChange={handleChange} checked={sideBarData.type === 'all'}/>
                        <span className='text-orange-400'>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="rent" className='w-5' onChange={handleChange} checked={sideBarData.type === 'rent'}/>
                        <span className='text-orange-400'>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="sale" className='w-5' onChange={handleChange} checked={sideBarData.type === 'sale'}/>
                        <span className='text-orange-400'>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="offer" className='w-5' onChange={handleChange} checked={sideBarData.offer === true}/>
                        <span className='text-orange-400'>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='text-orange-400'>Amenities:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="parking" className='w-5' onChange={handleChange} checked={sideBarData.parking}/>
                        <span className='text-orange-400'>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="furnished" className='w-5' onChange={handleChange} checked={sideBarData.furnished}/>
                        <span className='text-orange-400'>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className=' text-orange-400'>Sort:</label>
                    <select id="sort_order" className='border rounded-lg p-3 text-orange-400 bg-transparent' onChange={handleChange} defaultValue={'created_at_desc'}>
                        <option className='bg-gray-500' value='regularPrice_desc'>Price High to Low</option>
                        <option className='bg-gray-500' value='regularPrice_asc'>Price Low to High</option>
                        <option className='bg-gray-500' value='createdAt_desc'>Latest</option>
                        <option className='bg-gray-500' value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className="bg-transparent border-orange-400 border-2 w-1/3 mb-4 p-2 text-white rounded-lg cursor-pointer hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-black">Search</button>
            </form>
        </div>
        {/* Search Results */}
        <div className="flex-1">
            <h1 className='text-orange-400 text-xl m-2 border-b-2 p-4 border-orange-400 w-full'>Listing Results:</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className='text-orange-400 text-xl'>No listing found!</p>
                )}
                {loading && (
                    <p className='text-xl text-orange-400 text-center w-full'>Loading...</p>
                )}

                {
                    !loading && listings && listings.map((listing) => <ListingCards key={listing._id} listing={listing}/>)
                }
                {showMore && (
                    <button onClick={onShowMoreClick} className='w-full text-center p-7 hover:underline text-orange-400'>
                        Show More
                    </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default Search;

// Add show more listings functionality