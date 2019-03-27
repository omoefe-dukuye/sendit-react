import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import uuid from 'uuid/v1';
import './styles.scss';

const captions = {
  fast: 'Unbelievably fast delivery...',
  map: 'Distance and time estimates with Google Maps...',
  service: 'Excellent customer service...'
};


export class Slider extends Component {
  state = {
    content: 'map'
  }

  componentDidMount() {
    setTimeout(() => this.setState({ content: 'fast' }), 5000);
  }

  componentDidUpdate() {
    setTimeout(() => this.setState(({ content }) => ({
      content: content === 'fast'
        ? 'service'
        : content === 'service'
          ? 'map'
          : 'fast',
    })), 5000);
  }

  render() {
    const { content } = this.state;

    return (
      <div className="home__slider">
        <ReactCSSTransitionGroup
          transitionName="slider"
          transitionAppear={true}
          transitionAppearTimeout={800}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          <div className="home__slider__slide-item" key={uuid()}>
            <p>{captions[content]}</p>
            <div className={
              `home__slider__slide-item__image home__slider__slide-item__image--${content}`
            } />
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Slider;
