import { useForm } from "../Hooks/useForm"
import { useCourseContext } from "../contexts/CourseContext"
import { SearchPage } from "./SearchPage"
import { useState } from "react"

export const SearchField = () => {

    const { onSearchSubmit } = useCourseContext()



    const { onSubmit, onChangeHandler, values } = useForm({
        searchName: "",
    }, onSearchSubmit)
    return (
        <>


            <div className="welcome-hero-serch-box">
                <div className="welcome-hero-form">
                    <div className="single-welcome-hero-form">
                        <h3>Find your Course :</h3>
                        <form if="search-form" onSubmit={onSubmit}>
                            <input type="text" placeholder="" name="searchName" value={values.searchName} onChange={onChangeHandler} />

                        </form>
                        {/* <div className="welcome-hero-form-icon">
                    <i className="flaticon-list-with-dots"></i>
                </div> */}
                    </div>

                </div>
                <div className="welcome-hero-serch">
                    <button className="welcome-hero-btn" form="search-form" type="submit" >
                        search
                    </button>
                </div>
            </div>


        </>
    )
}