import React from 'react';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = { spans: 0};
  }

  componentDidMount() {
    // if we want to call any properties of the ref here, it is not return anything
    // because it gets called right away even when the image has not been loaded
    // this.imageRef.current.clientHeight;
    // so we have to addEvenListener to it
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;

    // see the number of the rows that image take. 150px is the height of a row
    const spans = Math.ceil(height / 10);

    this.setState({ spans: spans});
  }

  render() {
    const {description, urls} = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img ref={this.imageRef} alt={description} src={urls.regular} />
      </div>
    );
  }
}

export default ImageCard;
