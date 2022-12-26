import React,{useState,useEffect} from 'react'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import images from '../utils/data2'

export default function Search({searchTerm}) {
  const [pins,setPins] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
      if(searchTerm)
      {
        setLoading(true)
        const result = images.filter(img => img.title.toLowerCase().includes(searchTerm))
        setPins(result)
        setLoading(false)
      }else{
        const result = images.map(img => img)
        setPins(result)
        setLoading(false)
      }
  },[searchTerm])

  return (
    <div>
      {loading && <Spinner message="Searching for a pin..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && 
      <div className='mt-10 text-center text-xl'>No Pins Found !</div>
      }
    </div>
  )
}
