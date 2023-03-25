import _ from "lodash";
import React, { useEffect, Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import profilesData from "../data/profile.json";

const initialState = { isLoading: false, results: [], value: "" };
const users = profilesData?.profiles;
export default class Searches extends Component {
  state = initialState;

  constructor(props) {
    super(props);
    this.state = { details: [] };
  }

  componentDidMount() {
    console.log(this.props.user);
    const userss = async () => {
      var obj = await [];
      var res = await Array.from(users, (x) =>
        obj.push({
          title: x.email,
          description: x.city,
          image: x.profpic,
          price: `${x.name}`,
        })
      );
      console.log("obj", obj);
      this.setState({
        details: obj,
      });
    };

    userss();
  }

  handleResultSelect = async (e, { result }) => {
    await this.setState({ value: result.age });
    await this.props.setSection(result.description);
    await this.props.onSearch(result.title);
    this.setState({
      value: "",
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.details, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            aligned="left"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
