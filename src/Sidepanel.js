import React, { Component } from "react";

var blue = "list-group-item pointer mb-2 bg-primary";
var dark = "list-group-item pointer mb-2 bg-dark";

class Sidepanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseRecords: []
    };
  }

  componentDidMount() {
    this.performSearchOnDatabase();
  }

  performSearchOnDatabase() {
    let url = "/userlists";
    fetch(url)
      .then(response => response.json())
      .then(results => {
        console.log(results);
        results.unshift({ listName: "All Tasks" }); // Add a standard All Tasks list
        results.push({ listName: "Completed" }); // Add a standard Completed list
        this.setState({
          databaseRecords: results
        });
      });
  }

  drawToDOM = argObj => (
    <div
      onClick={() => this.props.makeActiveList(argObj.listName)}
      className={blue}
    >
      {argObj.listName}
    </div>
  );

  render() {
    //Establish and add to the dataset
    var items = this.state.databaseRecords;

    //Create a new arraw to contain the HTML
    var assembledElements = [];

    console.log("ACTIVE LIST IS: " + this.props.activeList);
    for (var i = 0; i < items.length; i++) {
      let x = items[i].listName;
      //Decide on the class
      let classToApply;
      if (x === this.props.activeList) {
        classToApply = dark;
      } else {
        classToApply = blue;
      }
      //Push to array
      console.log(x);
      assembledElements.push(
        <div
          onClick={() => this.props.makeActiveList(x)}
          className={classToApply}
        >
          {x}
        </div>
      );
    }

    //Return
    return <div>{assembledElements}</div>;
  }
}

export default Sidepanel;
