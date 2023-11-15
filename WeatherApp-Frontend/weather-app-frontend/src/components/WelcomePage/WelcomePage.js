import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const WelcomePage = ({ currentUser }) => {
  const slides = [
    {
      url: "https://cdn.dribbble.com/users/1402400/screenshots/10749402/media/8d6077054437ef335bdaee71855c23e6.gif",
    },
    {
      url: "https://cdn.dribbble.com/users/877668/screenshots/3200722/media/0eb556092b79fa7a7eeb755ef075f9de.gif",
    },
    {
      url: "https://cdn.dribbble.com/users/2530132/screenshots/5255837/media/f0c6ad31ab652acfff8f170b34e3bb55.gif",
    },

    {
      url: "https://cdn.dribbble.com/users/1498331/screenshots/3485353/media/ddab324c0afd9f24d6c90032c56dcd7b.gif",
    },

    {
      url: "https://tvishacdn.tvisha.com/data/images/2208200917/What_are_the_weather_features.png",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="max-w-screen-xl h-screen w-full m-auto py-16 px-4 relative group">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-100 text-center">
        Welcome {currentUser.username}!
      </h1>
      <br />
    </div>
  );
};

export default WelcomePage;
