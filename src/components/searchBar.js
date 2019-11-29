import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";
import Autocomplete from "react-autocomplete";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.label,
      items: []
    };
    this._onChange = this._onChange.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  // fired whenever inpput value is change
  _onChange(e) {
    if (e.target.value.length > 0) {
      // search and set items
      this.props.search(e.target.value).then(r => {
        if (!r.success) return console.error(r.error);
        // yay, success!
        this.setState({ items: r.data.entries || [] });
      });
    }
    this.setState({ value: e.target.value });
  }

  _renderItem(item, highlighted) {
    return (
      <div
        key={item.key}
        className={highlighted ? "autoCompleteItemHover" : "autoCompleteItem"}
      >
        {item.key}
      </div>
    );
  }

  // search items are in the form {key (string), value(int)}
  // nodes are in form {id(int), label(string)}
  _onSelect(node, searchItem) {
    this.props.onSelect({
      id: searchItem.value,
      label: searchItem.key
    });
    this.setState({ value: node });
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
        renderItem={this._renderItem}
        value={this.state.value}
        onChange={this._onChange}
        onSelect={this._onSelect}
      />
    );
  }
}

Search.propTypes = {
  onSelect: PropTypes.func,
  search: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object
};

Search.defaultProps = {
  onSelect: () => {},
  value: { label: "" }
};

export default Search;
