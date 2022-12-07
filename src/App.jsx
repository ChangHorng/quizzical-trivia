import React from "react"
import Start from "./components/Start"

export default function App() {

    const[allCategory, setAllCategory] = React.useState([])

    const[categoryId, setCategoryId] = React.useState(0)

    React.useEffect(() => {
        async function getCategory() {
            const response = await fetch("https://opentdb.com/api_category.php")
            const data = await response.json()
            setAllCategory(data.trivia_categories)
        }
        getCategory()
    }, [])

    function handleCategoryChange(event) {
        const {value} = event.target
        setCategoryId(value)
    }

    return (
        <div>
            <img src="/images/blobs-yellow.png" className="blobs-yellow"/>
            <Start 
                allCategory={allCategory}
                categoryId={categoryId}
                handleCategoryChange={handleCategoryChange}
            />
            <img src="/images/blobs-blue.png" className="blobs-blue"/>
        </div>
    )
}