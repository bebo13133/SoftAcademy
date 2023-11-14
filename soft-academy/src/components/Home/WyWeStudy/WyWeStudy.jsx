
import './wyWeStudy.css'
import { useState } from 'react';
export const WyWeStudy = () => {

  const [showMore, setShowMore] = useState(false);




  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section className="main-section">

      <div className="sub-section textarea-section">
        <h3 className="text-paragraph-3">Why am I learning programming?</h3>
        <p 
        // className={`text-paragraph-4 ${showMore ? 'show' : ''}`}
        >The accelerating <strong>technological developments</strong> characterize the <strong>21st century</strong>. 
          It is all around us, from the alarm clock on our phones that wakes us up in the morning, to the coffee machines that can brew our coffee with just a push of a button.
Behind most everything we see on the internet—every word, picture, chart, layout, etc.—there is someone who programmed it to look as such to us.
So why should you become a programmer? 
<strong>  Here's a list of some of the reasons.</strong></p>

        <h3 className="text-paragraph-3">What is programming...</h3>

        <p>Programming refers to a technological process ...</p>

        <p className={`text-paragraph-4 ${showMore ? 'show' : ''}`}> ...for telling a computer which tasks to perform in order to solve problems. You can think of programming as a collaboration between humans and computers,
         in which humans create instructions for a computer to follow (code) in a language computers can understand. 

Programming enables so many things in our lives. Here are some examples: 

When you browse a website to find information, contact a service provider, 
or make a purchase, programming allows you to interact with the site's on-page elements, 
such as sign-up or purchase buttons, contact forms, and drop-down menus.
The programming behind a mobile app can make it possible for you to order food, book a rideshare service,
 track your fitness, access media, and more with ease. 
Programming helps businesses operate more efficiently
 through different software for file storage and automation and video conferencing tools to connect people globally, among other things. 
Space exploration is made possible through programming.</p>
        <h3 className={`text-paragraph-5 ${showMore ? 'show' : ''}`}>Popular programming languages</h3>
        <p className={`text-paragraph-4 ${showMore ? 'show' : ''}`}>
        Ever wondered which is the most demanded programming <strong>language in 2023</strong>? Although there are more than 200+ programming languages,
         only few of them are used in the real world industry. 
        Knowing this information is essential to succeed in <strong>the developer job industry.</strong> </p>
        <ul className={`text-paragraph-4 ${showMore ? 'show' : ''}`}>
          <li>JavaScript / TypeScript
            <p>Since its creation to make the firsts websites dynamic, JavaScript hasn't stopped gaining popularity over the years. With that being said, 
              currently JavaScript is the most demanded programming language in the entire market. Also, the arrival of TypeScript <strong>(a JavaScript superset with type safety)</strong>
               may also help to achieve this milestone. TypeScript popularity has only increased in recent years. Many new JavaScript frameworks are entirely written with TypeScript, like Angular or NestJS.
Since January 2022 to May 2023 (seventeen months), <strong> we have found 915K job offers that represents ~29% of the jobs </strong> that explicitly required JavaScript or TypeScript as a programming language.</p>
          </li>
          <li>Python
            <p>Without making much noise, Python has made its journey to be the second most demanded programming language in 2023. Its versatility, from scripting, running servers or for data analysis, has been key to achieving this milestone. Also, Python has one of the greatest and bigger communities out there.

During these seventeen months we have found 603K job offers that accounts for a <strong> total of ~20% of jobs </strong> that explicitly required Python as a programming language.</p>
          </li>
          <li>Java
            <p>
            In the top three spot, as the third most demanded programming language, we found Java.
             Java language has been really popular since its <strong>creation in 1995.</strong> Even though this popularity has been decreasing over the last years with the appearance of more modern languages like Kotlin, it still holds a solid top three spot. 
            Frameworks like Spring, <strong>used in many top tier companies</strong>, are helping to hold that position
            </p>
          </li>

        </ul>
        {!showMore && <button className="show-more-button" onClick={toggleShowMore}>Show More</button>}
        {showMore && <button className="show-more-button" onClick={toggleShowMore}>Show Less</button>}
      </div>

      <div className="sub-section image-section">
        <img className="image-field" src="/img/students1.jpg" alt="student1" />
        <img className="image-field" src="/img/students2.jpg" alt="student2" />
        <img className="image-field" src="/img/students3.jpg" alt="student3" />
      </div>
    </section>
  )
}