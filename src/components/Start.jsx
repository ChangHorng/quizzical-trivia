import React from "react"

export default function Start(props) {
    
    // Show all possible category from API
    const categoryList = props.allCategory.map(category =>
        <option value={category.id}>
            {category.name}
        </option>
    )

    return (
        <div>
            <img src="/images/blobs-yellow.png" className="image-blobs-yellow"/>
            <div className="start">
                <h2>Quizzical</h2>
                <p>Time for some Quizzical fun!</p>
                <label htmlFor="category">
                    Please select category for Quizzical:
                </label>
                <br />
                <select 
                    id="category"
                    value={props.categoryId}
                    onChange={props.handleCategoryChange}
                >
                    <option value={0}>
                        Any Category
                    </option>
                    {categoryList}
                </select>
                <br/>
                <button onClick={props.startQuiz}>
                    Start quiz
                </button>
            </div>
            <img src="/images/blobs-blue.png" className="image-blobs-blue"/>
        </div>
    )
}
