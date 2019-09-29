import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";
import Autocomplete from "react-autocomplete";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: []
    };
    this._onChange = this._onChange.bind(this);
  }

  // fired whenever inpput value is change
  _onChange(e) {
    if (e.target.value.length > 3) {
      // search and set items
      this.setState({ items: [{ id: "foo", label: "bar" }] });
    }
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Autocomplete
        items={this.state.items}
        inputProps={{ placeholder: this.props.placeholder }}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            className={
              highlighted ? "autoCompleteItemHover" : "autoCompleteItem"
            }
          >
            {item.label}
          </div>
        )}
        value={this.state.value}
        onChange={this._onChange}
        onSelect={value => this.setState({ value })}
      />
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string
};

Search.defaultProps = {
  value: ""
};

export default Search;
