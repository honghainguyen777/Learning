import React from 'react';

class Accordion extends React.Component {
  state = { activeIndex: 0 };

  onTitleClick = (index) => {
    this.setState({
      activeIndex: index,
    });
  };

  renderItems() {
    return this.propsitems.map((item, index) => {
      return (
        <React.Fragment key={item.title}>
          <div
            className="title active"
            onClick={() => this.onTitleClick(index)}
          >
            <i className="dropdown icon"></i>
            {item.tilte}
          </div>
          <div className="content active">
            <p>{item.content}</p>
          </div>
        </React.Fragment>
      );
    });
  }

  render() {
    return (
      <div className="ui styled accordion">
        {this.renderItems()}
        <h1>{this.state.activeIndex}</h1>
      </div>
    );
  }
}

export default Accordion;
