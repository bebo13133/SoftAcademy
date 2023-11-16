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
                        <label htmlFor="criteria"  style={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: 0, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>Choose criteria:</label>
                            <select id="criteria" value={values.criteria} placeholder="Choice your language" name="criteria" onChange={onChangeHandler} >
                                <option value="">Select an option</option>
                                <option value="courseName">Course name</option>
                                <option value="language-name">Language name</option>
                                <option value="lector-name">Lector name</option>
                             
                            </select>
                        </div>

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