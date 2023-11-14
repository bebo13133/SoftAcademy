
import './wyWeStudy.css'

export const WyWeStudy=()=>{

    return(
        <section className="main-section">
       
       <div className="sub-section textarea-section">
        <p className="text-paragraph" contentEditable="true">Текстово поле 1</p>
        <p className="text-paragraph" contentEditable="true">Текстово поле 2</p>
      </div>
  
        <div className="sub-section image-section">
          <img className="image-field" src="path/to/image1.jpg" alt="Изображение 1" />
          <img className="image-field" src="path/to/image2.jpg" alt="Изображение 2" />
          <img className="image-field" src="path/to/image3.jpg" alt="Изображение 3" />
        </div>
      </section>
    )
}