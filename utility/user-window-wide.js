import { useEffect, useState } from "react"

//utility to get boolean if current screen is desktop screen
//depend on "size" that user send
const useWindowWide = (size) => {
    const [width, setWidth] = useState(0)
    
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth)
      }
      
      window.addEventListener("resize", handleResize)
      
      handleResize()
      
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [setWidth])
    
    return width > size
}

export default useWindowWide