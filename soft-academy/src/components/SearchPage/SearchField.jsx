import { useForm } from "../Hooks/useForm"
import { useCourseContext } from "../contexts/CourseContext"
import { SearchPage } from "./SearchPage"
import { useState } from "react"

export const SearchField = () => {

    const { onSearchSubmit } = useCourseContext()



    const { onSubmit, onChangeHandler, values } = useForm({
        searchName: "",
        criteria:''
    }, onSearchSubmit)
    return (
        <>


            <div className="welcome-hero-serch-box">
                <div className="welcome-hero-form">
                    <div className="single-welcome-hero-form">
                        {/* <h3>Search :| </h3> */}
                        <form id="search-form" onSubmit={onSubmit}>
                            <input type="text" placeholder="find your Course..."  name="searchName" value={values.searchName} onChange={onChangeHandler} />

                        </form>
                        <div className="city-item">
                            <select value={values.criteria} placeholder="Choice your language" name="criteria" onChange={onChangeHandler} >
                                <option value="">Select an option</option>
                                <option value="Java Script">Course name</option>
                                <option value="Java">Language name</option>
                                <option value="Python">Lector name</option>
                             
                            </select>
                        </div>
                        {/* <div className="welcome-hero-form-icon">
                    <i className="flaticon-list-with-dots"></i>
                </div> */}
                    </div>

                </div>
                <div className="welcome-hero-serch">
                    <button className="welcome-hero-btn" type="submit" form="search-form" >
                        search
                    </button>
                </div>
            </div>


        </>
    )
}