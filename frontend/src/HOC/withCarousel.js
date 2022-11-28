import Caroussel from '../components/Caroussel';

export default withCarousel =
  (Component) =>
  ({ pictureNumber, ...props }) => {
    if (pictureNumber > 1)
      return <Caroussel {...props} Component={Component} />;
    return <Component {...props} />;
  };
