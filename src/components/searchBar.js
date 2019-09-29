import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";
import Autocomplete from "react-autocomplete";
import { search } from "../api/twowaykv";

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
    if (e.target.value.length > 0) {
      // search and set items
      search(e.target.value).then(r => {
        if (!r.success) return console.error(r.error);
        // yay, success!
        this.setState({ items: r.data.entries });
      });
    }
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Autocomplete
        shouldItemRender={(item, value) =>
          item.key.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        items={this.state.items}
        inputProps={{ placeholder: this.props.placeholder }}
        getItemValue={item => item.key}
        renderItem={(item, highlighted) => (
          <div
            key={item.key}
            className={
              highlighted ? "autoCompleteItemHover" : "autoCompleteItem"
            }
          >
            {item.key}
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
