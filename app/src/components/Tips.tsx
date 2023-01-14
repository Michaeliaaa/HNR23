import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"

export const Tips = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="tip" id="tips">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="tip-bx wow zoomIn">
                        <h2>Useful tips!</h2>
              <p>
                <h5>
                  Hey Chosen One, before you start, please take note that this puzzle is originally meant for Oxbridge-educated men living in London in 1934. <b></b>
                As such, unless you are old enough or knowledgeable about the people, places and events that happen during that period of time, I don't believe you can solve it without external help. <b></b>
                Here are some useful links to help you get started with!
                </h5>
              </p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme tip-slider">
                <div className="item">
                  <a href="https://www.reddit.com/r/CainsJawbone"><h5>r/CainsJawbone</h5></a>
                  <p>A community of people trying to solve Cain's Jawbone, the world's most fiendishly difficult literary puzzle.</p>
                </div>
                <div className="item">
                  <a href="https://www.thebookofdays.com/"><h5>The Book of Days</h5></a>
                  <p>Contains detailed descriptions of key historical events, the life and times of people, both great and infamous, and long forgotten customs of cultures from every corner of the world</p>
                </div>
                <div className="item">
                  <a href="https://drive.google.com/file/d/1F_gVrnisA0Kg8-195fbDjtJT3BX6g2Mi/view"><h5>Words gone wild</h5></a>
                  <p>A guide for how to solve cryptic-crossword-esque by Jim Bernhard. Hints for punctuations!!</p>
                </div>
                <div className="item">
                  <a href="https://drive.google.com/drive/folders/1zIX2j_BXr7Gmk4mnlSqouYF993_SpFfw"><h5>Oxford Dictionary from the 1930s</h5></a>
                  <p>Contains definitions of words that were used in the 1930s</p>
                </div>
                <div className="item">
                  <a href="https://www.reddit.com/r/CainsJawbone/comments/ui8t8o/an_experiment_solve_the_book_in_a_distributed_way/"><h5>Inspiration for coders</h5></a>
                  <p>Maybe you could consider implementing AI to speed things out? Better chances than brute force!!</p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-right" src={colorSharp} alt="" />
    </section>
  )
}
