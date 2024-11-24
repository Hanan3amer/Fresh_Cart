import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export default function useProducts() {
    function Getallproducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let Responseobject = useQuery({queryKey:['allproducts'],
        queryFn: Getallproducts,
    })
  return Responseobject
}
