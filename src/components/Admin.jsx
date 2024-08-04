import React ,{ useEffect, useState}from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { authActions } from '../store/Auth';
import { placeActions } from '../store/places';

const Admin = () => {
  
const history = useHistory()
const dispatch = useDispatch()
const [pname, setPName] = useState("");
const [price, setPrice] = useState("");
const[address,setAddress] = useState("");

const[image1,setImage1] = useState("")
const [image2,setImage2] = useState("")
const[image3,setImage3] = useState("")

const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const[cat,setCat] = useState('home')

const[places,setPlaces] = useState([])
const [isEdit, setEdit] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [dat,setDat] = useState("")
  const[placeByDate,setPlaceByDate] = useState([])
  const [total,setTotal] = useState(0)
  const[bookings,setBookings] = useState([])
  
  //console.log("cat",cat)
let url = "https://react-pro2-default-rtdb.firebaseio.com"

const user = localStorage.getItem('email').replace(/['@','.']/g, "");
    const logOutHandler = () => {
        dispatch(authActions.logOut())
        history.replace("/login");
      };


      const fetchDataBooking =async ()=>{
        try {
           const response = await fetch(`${url}/booking.json`)
           if(response.ok){
              const fetchedData = await response.json()
    
              let arr = [];
              for (let key in fetchedData) {
              
               arr.push({
                 id: key,
                 pname:fetchedData[key].pname,
                 checkIn:fetchedData[key].checkIn,
                 checkOut:fetchedData[key].checkOut,
                 guests:fetchedData[key].guests,
                 address:fetchedData[key].address,
                 status:fetchedData[key].status,
                 image:fetchedData[key].image,
                 price:fetchedData[key].price,
                 user:fetchedData[key].user,
               });
             }
             console.log(arr)
             setBookings(arr)
            
           }
        } catch (error) {
           console.log(error)
        }
    }
    useEffect(()=>{
        fetchDataBooking()
    },[])

      const fetchCategory = async()=>{
        try {
            const response = await fetch(`${url}/categories.json`)
            if(response.ok){
                const fetchedCategories = await response.json();
               // console.log(fetchedCategories)
    
               let arr=[]
                for (let key in fetchedCategories) {
                    arr.push(fetchedCategories[key]);
                  }
                  setCategories(arr)
                  
            }
        } catch (error) {
            console.log(error)
        }
      }
    
       useEffect(()=>{
        fetchCategory()
       },[])



  
 
  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async() => {
    if (newCategory.trim() !== '') {
        try {
            const response = await fetch(`${url}/categories.json`,{
                method:"POST",
                body:JSON.stringify(newCategory.trim())
            })
            if(response.ok){
                setCategories([...categories, newCategory.trim()]);
                setNewCategory('');
                fetchCategory()
            }
        } catch (error) {
            console.log(error)
        }
      
    }
  };
   const today = new Date()
   const day  = today.getDate();
   const month = today.getMonth()+1;
   const year = today.getFullYear();

   const date = day+"/"+month+"/"+year;
    useEffect(()=>{
        fetchData()
    },[])

   const fetchData =async ()=>{
         try {
            const response = await fetch(`${url}/places.json`)
            if(response.ok){
               const fetchedData = await response.json()

               let arr = [];
               for (let key in fetchedData) {
                arr.push({
                  id: key,
                  pname:fetchedData[key].pname,
                  price:fetchedData[key].price,
                  address:fetchedData[key].address,
                  image1:fetchedData[key].image1,
                  image2:fetchedData[key].image2,
                  image3:fetchedData[key].image3,
                  category:fetchedData[key].category,
                  available:fetchedData[key].available,
                  date:fetchedData[key].date,
                });
              }
              console.log(arr)
              setPlaces(arr)
              dispatch(placeActions.addPlaces(arr))
            }
         } catch (error) {
            console.log(error)
         }
   }

  const submitHandler=async(e)=>{
      e.preventDefault();
      if(isEdit === true){
        let placeData = {
            pname:pname,
            price:Number(price),
            address:address,
            image1:image1,
            image2:image2,
            image3:image3,
            category:cat,
            available:true,
            date:date
          }

          try{
              const response = await fetch(`${url}/places/${placeId}.json`,
                {
                    method:"PUT",
                    body:JSON.stringify(placeData)
                }
    
              )

              if(response.ok){
                setPName("")
                setAddress("")
                setPrice("")
                setImage1("")
                setImage2("")
                setImage3("")
                setCat(cat)
        
               
                fetchData()
              }
          }catch(e){
            console.log(e)
          }




      }else{
          

        let placeData = {
            pname:pname,
            price:Number(price),
            address:address,
            image1:image1,
            image2:image2,
            image3:image3,
            category:cat,
            available:true,
            date:date
          }
          try {
            const response = await fetch(`${url}/places.json`,
                {
                    method:"POST",
                    body:JSON.stringify(placeData)
                }
    
            )
           if(response.ok){
            setPlaces(prevState=>[...prevState,placeData])
            setPName("")
            setAddress("")
            setPrice("")
            setImage1("")
            setImage2("")
            setImage3("")
            setCat(cat)
    
            //getting place data function
            fetchData()
    
            console.log("data submitted sucessfully",response)
    
           }
    
            
          } catch (error) {
            console.log(error)
          }
          
      }
      

  }
  const editHandler = (id) => {
    let editPlace = places.filter((place) => place.id === id);
    console.log(editPlace);
    setEdit(true);
    setPlaceId(id);
    setPName(editPlace[0].pname);
    setPrice(editPlace[0].price);
    setAddress(editPlace[0].address);
    setImage1(editPlace[0].image1)
    setImage2(editPlace[0].image2)
    setImage3(editPlace[0].image3)
    setCat(editPlace[0].category)
    

    dispatch(placeActions.editPlaces({ id, editPlace }));
    
  };
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `${url}/places/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      dispatch(placeActions.removePlaces(id));
      fetchData();
    } catch (err) {
      alert(err);
    }
  };
  const changeHandler=async(e,id)=>{
    if(!e.target.checked){
        try {
    
            const response = await fetch(`${url}/places/${id}.json`,
                {
                    method:"PATCH",
                    body:JSON.stringify({
                         available:false
                    }),
                    headers:{
                        'Content-Type':'application/json'
                      }
                }
    
              )
            //   const data = await response.json()
            //   console.log(data)
              if(response.ok){
                fetchData()
              }
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
    
            const response = await fetch(`${url}/places/${id}.json`,
                {
                    method:"PATCH",
                    body:JSON.stringify({
                         available:true
                    }),
                    headers:{
                        'Content-Type':'application/json'
                      }
                }
    
              )
            //   const data = await response.json()
            //   console.log(data)
              if(response.ok){
                fetchData()
              }
        } catch (error) {
            console.log(error)
        }
    }
    
  }
  const dateHandler = (e)=>{
       setDat(e.target.value)
           let dateObj = new Date(e.target.value)
          
           const day = dateObj.getDate()
           const month = dateObj.getMonth()+1;
           const year = dateObj.getFullYear();
           

  const dat = day+"/"+month+"/"+year;
 
   const placebDate = (places.filter(p=>p.date===dat.toString()))
   setPlaceByDate(placebDate)
    const calculateTotalAmount = placebDate.reduce((sum, p) => sum + Number(p.price), 0);

  setTotal(calculateTotalAmount)



          
  }
  const approveHandler =async(id)=>{
    try {
    
        const response = await fetch(`${url}/booking/${id}.json`,
            {
                method:"PATCH",
                body:JSON.stringify({
                     status:"completed"
                }),
                headers:{
                    'Content-Type':'application/json'
                  }
            }

          )
        //   const data = await response.json()
        //   console.log(data)
          if(response.ok){
            fetchDataBooking()
          }
    } catch (error) {
        console.log(error)
    }
    
  }
  function calculateDifferenceInDays(checkInDate, checkOutDate) {
    
    const checkInTime = new Date(checkInDate).getTime();
    const checkOutTime = new Date(checkOutDate).getTime();
  
   
    const differenceInTime = checkOutTime - checkInTime;
  
   
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
    return differenceInDays;
  }
  return (
    <div className='container mx-auto'>
      <div className="flex justify-end">
      <button onClick={logOutHandler} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3'>logout</button>
      </div>  
      <div className="flex mt-7">
        <input
          type="text"
          value={newCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500 mr-2"
          placeholder="Add new category"
          required
        />
        <button onClick={handleAddCategory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>
     


      <div className="bg-white p-8 rounded shadow-md mt-7">
      <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-7 gap-2">
        
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Place Name
          </label>
          <input
            type="text"
            id="pname"
            name="pname"
            value={pname}
            onChange={e=>setPName(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price Per Night
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={e=>setPrice(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Place Address
          </label>
          <input
            type="address"
            id="address"
            name="address"
            value={address}
            onChange={e=>setAddress(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image1" className="block text-gray-700 font-bold mb-2">
            Image Url1
          </label>
          <input
            type="text"
            id="image1"
            name="image1"
            value={image1}
            onChange={e=>setImage1(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image2" className="block text-gray-700 font-bold mb-2">
            Image Url2
          </label>
          <input
            type="text"
            id="image2"
            name="image2"
            value={image2}
            onChange={e=>setImage2(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image3" className="block text-gray-700 font-bold mb-2">
            Image Url3
          </label>
          <input
            type="text"
            id="image3"
            name="image3"
            value={image3}
            onChange={e=>setImage3(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="image3" className="block text-gray-700 font-bold mb-2">
            Select Category
          </label>
        <select onChange={e=>setCat(e.target.value)} value={cat} className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500">
        {categories.map((category, index) => (
          <option key={index} value={category} >
            {category}
          </option>
        ))}
      </select>
      </div>
        
    </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        >
         Add
        </button>
        
      </form>
    </div>


    <div className="bg-white p-8 rounded shadow-md mt-2">

      <h2 className="text-2xl font-bold mb-4">List of Places</h2>

      <div className="grid grid-cols-4 gap-2 items-center justify-items-center">
      <label className="block text-gray-700 font-bold mb-2">
           Place Name
      </label>
      <label className="block text-gray-700 font-bold mb-2">
           Price Per Night
      </label>
      <label className="block text-gray-700 font-bold mb-2">
           Available
      </label>
      {/* <label className="block text-gray-700 font-bold mb-2">
           Place Name
      </label>
      <label className="block text-gray-700 font-bold mb-2">
           Place Name
      </label> */}
      </div>
      

{places.length > 0 ? (
          <>
            {places.map((place, index) => (
              <div className='grid grid-cols-4 gap-2 items-center justify-items-center' key={index}>
                <div >{place.pname} </div>
                <div> {place.price}</div>
                
                  <div>
                  <input 
                  onChange={(e)=>changeHandler(e,place.id)}
                  
                  checked={place.available}
                  type="checkbox" name="available" id="available"
                  className="mr-5 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-transparent" />
                  </div>
                  <div>
                  <span>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
                      onClick={() => editHandler(place.id)}
                    >
                      edit
                    </button>
                  </span>{" "}
                  <span>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3'
                      onClick={() => deleteHandler(place.id)}
                    >
                      delete
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>no data available</p>
        )}
      

    </div>

    <div className="bg-white p-8 rounded shadow-md mt-2">
        <h2 className="text-2xl font-bold mb-4">View</h2>
        <label className="block text-gray-700 font-bold mb-2">select date</label>
        <input onChange={dateHandler} value={dat}
        className="border border-gray-300 rounded  py-2 px-4 mb-2 focus:outline-none focus:border-blue-500" type="date" name='date' id='date'  />
        <div className="grid grid-cols-4 gap-2 items-center justify-items-center">
        <label className="block text-gray-700 font-bold mb-2">
        Place Name
      </label>
      <label className="block text-gray-700 font-bold mb-2">
         Price
      </label>
        </div>
        {placeByDate.map((place, index) => (
              <div className='grid grid-cols-4 gap-2 items-center justify-items-center' key={index}>
                <div >{place.pname} </div>
                <div> {place.price}</div>
                
              </div>
            ))}
        
        <label className="block text-gray-700 font-bold mb-2 mt-5">Total Amount :{total}</label>
        
    </div>


    <div className="bg-white p-8 rounded shadow-md mt-2">

      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>

      <div className="grid grid-cols-4 gap-2 items-center justify-items-center">
      <label className="block text-gray-700 font-bold mb-2">
           Place Name
      </label>
      <label className="block text-gray-700 font-bold mb-2">
           User
      </label>
      <label className="block text-gray-700 font-bold mb-2">
           Booking dates
      </label>
      {/* <label className="block text-gray-700 font-bold mb-2">
           Place Name
      </label>
      <label className="block text-gray-700 font-bold mb-2">
           Place Name
      </label> */}
      </div>
      

{bookings.length > 0 ? (
          <>
            {bookings.map((booking, index) => (
              <div className='grid grid-cols-4 gap-2 items-center justify-items-center' key={index}>
                <div >{booking.pname} </div>
                <div> {booking.user}</div>
                
                  <div>
                  {calculateDifferenceInDays(booking.checkIn,booking.checkOut)}
                  </div>
                  <div>
                  <span className='font-bold'>
                    status:
                    {booking.status}
                  </span>{" "}
                  <span>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
                      onClick={() => approveHandler(booking.id)}
                     
                    >
                        {(booking.status=="pending") ? "Approve Booking" :"Approved"}
                      
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>no data available</p>
        )}
      

    </div>



    </div>
  )
}

export default Admin