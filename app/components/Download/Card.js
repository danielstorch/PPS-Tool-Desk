import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import mui from 'material-ui';
import { connect } from 'react-redux';

var TextField = mui.TextField

const style = {
  border: '1px gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  render() {
    const { bikeType, id, errorText ,handleAuftragMengeChange, index, articleId, menge, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    let lol ="dsa"

    console.log("TextFieldId", "text"+id)
    console.log("errorText",errorText)
    console.log("ArticleId", articleId)
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        <div style={{"display": "inline-block", "marginRight":"10px"}} > {this.props.internationalReducer.activeLanguage.strings.CardIndex}  {index + 1} </div>
        <div style={{"display": "inline-block", "marginRight":"10px"}} > {this.props.internationalReducer.activeLanguage.strings.CardType}  {bikeType} </div>

        <div style={{"display": "inline-block", "marginRight":"10px"}} > {this.props.internationalReducer.activeLanguage.strings.CardArticleId}  {articleId} </div>
        <div style={{"display": "inline-block","marginRight":"3px"}} > {this.props.internationalReducer.activeLanguage.strings.CardMenge} </div>
        <TextField
                  style={{"width" : "150px"}}
                  id={id}
                  errorText={errorText}
                  errorStyle={{color:'orange'}}
                  onChange={this.props.handleAuftragMengeChange}
                  value={menge}/>

      </div>
    ));
  }
}

function mapStateToProps(state) {
  return {
    ActiveUploadXML: state.ActiveUploadXMLReducer,
    InputXMLs: state.InputXMLReducer,
    internationalReducer: state.internationalReducer
  }
}


export default connect(mapStateToProps, dispatch => ({dispatch}))(Card)
