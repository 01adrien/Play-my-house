import Caroussel from '../components/Caroussel';

const withCarousel =
  (Component) =>
  ({ pictureNumber, ...props }) => {
    if (pictureNumber > 1)
      return <Caroussel {...props} Component={Component} />;
    return <Component {...props} />;
  };

export default withCarousel;
