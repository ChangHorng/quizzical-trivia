import React from "react"

export default function Start(props) {
    
    const categoryLookup = props.allCategory.map(category =>
        <option value={category.id}>
            {category.name}
        </option>
    )

    return (
        <div className="start">
            <h2>Quizzical</h2>
            <p>Time For Some Quizzical Fun!</p>
            <label htmlFor="category">Please select category for Quizzical:</label>
            <br />
            <select 
                id="category"
                value={props.categoryId}
                onChange={props.handleCategoryChange}
            >
                <option value={0}>Any Category</option>
                {categoryLookup}
            </select>
            <br/>
            <button>
                Start quiz
            </button>
        </div>
    )
}