import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import categories from '../utils/data'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import images from '../utils/data2'
export default function Feed() {
// Now I will write hard code but I will convert at to a dynamic code later on with backend
const [loading,setLoading] = useState(false)
const [pins,setPins] = useState(null)
const {categoryId} = useParams()

  useEffect(() => {
        setLoading(true)
        if(categoryId)
        {
          // signle record
          // you need to know you will 
          // create a pin in a future when you build a backend
          const result = images.filter(category => category.id == categoryId)
          setPins(result)
          setLoading(false)
        }else{
          // multiple records
          const result = categories.map(category => category)
          setPins(result)
          setLoading(false)
        }
  },[categoryId])


  if(loading) return <Spinner message={`we are adding new ideas to your ${categoryId}`} />



 
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}
