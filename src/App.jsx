import React from "react";
import { hot } from "react-hot-loader/root";
import { Button } from '@material-ui/core';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="line-through">前面忘了</div>
        <Button variant="contained">this is a material UI button</Button>
         <a href="//x.347.ink">表情包</a>
         <a href="//x.347.ink">待开发</a>
        <div className="line-through">后面忘了</div>
      </>
    );
  }
}

export default hot(App);
