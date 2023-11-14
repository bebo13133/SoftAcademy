
import './wyWeStudy.css'

export const WyWeStudy=()=>{

    return(
        <section className="main-section">
       
       <div className="sub-section textarea-section">
        <p className="text-paragraph" contentEditable="true">Текстово поле 1</p>
        <p className="text-paragraph" contentEditable="true">Текстово поле 2</p>
      </div>
  
        <div className="sub-section image-section">
          <img className="image-field" src="/img/students1.jpg"  alt="student1" />
          <img className="image-field" src="/img/students2.jpg" alt="student2"/>
          <img className="image-field" src="/img/students3.jpg" alt="student3" />
        </div>
      </section>
    )
}