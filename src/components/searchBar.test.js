import React from "react";
import SearchBar from "./searchBar";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as twowaykv from "../api/twowaykv";

configure({ adapter: new Adapter() });

describe("components", () => {
  describe("search bar", () => {
    let defaultProps = {
      onSelect: (e) => {},
      placeholder: "test",
      search: () => {},
      value: {
        label: "test1",
        key: "test-key1",
      },
    };
    it("matches snapshot", () => {
      expect(<SearchBar {...defaultProps} />).toMatchSnapshot();
    });
    describe("_onChange", () => {
      let searchArgs = undefined;
      let newEntries = ["entry1", "entry2"];
      let props = {
        ...defaultProps,
        search: (e) => {
          searchArgs = e;
          return Promise.resolve({
            success: true,
            data: {
              entries: newEntries,
            },
          });
        },
      };

      it("searches for new items", (done) => {
        searchArgs = undefined;
        let wrapper = shallow(<SearchBar {...props} />);
        expect(wrapper.state(["items"])).toEqual([]);
        wrapper.instance()._onChange({ target: { value: "entry" } });
        setTimeout(() => {
          expect(wrapper.state(["items"])).toEqual(newEntries);
          expect(searchArgs).toMatchSnapshot();
          done();
        }, 100);
      });
      it("sets new value when for on change even if bad response from kv", () => {
        let newProps = {
          ...props,
          search: (e) => {
            return Promise.resolve({
              success: false,
            });
          },
        };
        let wrapper = shallow(<SearchBar {...props} />);
        expect(wrapper.state(["value"])).toEqual(props.value.label);
        wrapper.instance()._onChange({ target: { value: "entry" } });
        setTimeout(() => {
          expect(wraooer.state(["value"])).toEqual("entry");
          done();
        }, 100);
      });
    });

    describe("_renderItem", () => {
      let wrapper = shallow(<SearchBar {...defaultProps} />);
      expect(
        wrapper.instance()._renderItem({ key: "test1" }, false)
      ).toMatchSnapshot();
    });

    describe("_onSelect", () => {
      let wrapper = shallow(<SearchBar {...defaultProps} />);
      let node = {
        id: 234,
        label: "234",
      };
      let searchItem = {
        key: "3234",
        value: 234,
      };

      expect(wrapper.state(["value"])).toEqual(defaultProps.value.label);
      wrapper.instance()._onSelect(node, searchItem);
      expect(wrapper.state(["value"])).toEqual({ id: 234, label: "234" });
    });
  });
});
