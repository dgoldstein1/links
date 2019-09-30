import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";
import Autocomplete from "react-autocomplete";
import { search } from "../api/twowaykv";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.label,
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
        this.setState({ items: r.data.entries || [] });
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
        onSelect={(value, item) => {
          // search items are in the form {key (string), value(int)}
          // nodes are in form {id(int), label(string)}
          this.props.onSelect({
            id: item.value,
            label: item.key
          });
          this.setState({ value });
        }}
      />
    );
  }
}

Search.propTypes = {
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.object
};

Search.defaultProps = {
  onSelect: () => {},
  value: { label: "" }
};

export default Search;
