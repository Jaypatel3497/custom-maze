import React, { Component } from "react";
import { Button,Modal } from 'react-bootstrap';
import './mazeContainer_1.css'
var Heap = require('heap');
var stk = [];

class Mazecontainer_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xStart: "",
      yStart: "",
      xEnd: "",
      yEnd: "",
      width: "",
      height: "",
      map: "",
      mazeWidth: "",
      input: "",
      maze: [],
      Graph: [],
      tempGraph: [],
      time: 0,
      dfs: 1,
      go: 1,
      show: false,
      count: 0 ,
      algo: 0 , 
      matrix: {} ,
      startClicked: 0 ,
      endClicked: 0,
      start: {x: 0 , y: 0} ,
      end: {x: 0 , y: 0}
    };
}

 

    componentWillMount() {
        this.state.maze = [];
        this.state.matrix = [];
        var c = 0;
        for(var i = 0 ; i < 100 ; i++) {
            var temp = [];
            var temp_mat = [];
            for(var j = 0 ; j < 100 ; j++) {
                temp.push(<div id={i+"_"+j} key={c} className="col" className="white-grid-1" onClick={this.Change_color.bind(this)}/>);
                temp_mat.push(0);
                c++;
            }
            this.state.maze.push(<div className="row" style={{width: "3000px"}}> 
            {
                temp.map(it => {return it;})
            }
            </div>);
            this.state.matrix.push(temp_mat);
        }
        this.setState({maze: this.state.maze , matrix: this.state.matrix});
        console.log(this.state.matrix);
    }

    fo(a) {
        var arr = a.split("_");
        var ret = {x : parseInt(arr[0]) , y : parseInt(arr[1])};
        return ret;
    }

    Change_color(event) {
        var th = this.fo(event.target.id);
        var mat = this.state.matrix;
        if(event.target.className === "white-grid-1") {
            event.target.className = "black-grid-1";
            mat[th.x][th.y] = 1;
        }
        else {
            event.target.className = "white-grid-1";
            mat[th.x][th.y] = 0;
        }
        if(this.state.startClicked === 1) {
            event.target.style.backgroundColor = "green";
            this.setState({startClicked: 0 , start: th})
        }
        if(this.state.endClicked === 1) {
            event.target.style.backgroundColor = "red";
            this.setState({endClicked: 0 , end: th});
        }
        this.setState({matrix: mat});
        console.log(this.state.start);
    }

    onClickStart() {
        var x = document.getElementById(this.state.start.x + "_" + this.state.start.y);
        x.style.backgroundColor = "white";
        this.setState({startClicked: 1 , endClicked: 0});
    }

    onClickEnd() {
        var x = document.getElementById(this.state.end.x + "_" + this.state.end.y);
        x.style.backgroundColor = "white";
        this.setState({endClicked: 1 , startClicked: 0});
    }

    handlerGo() {
        var stack = [];
        var visited = {};
        for(var i = 0 ; i < 100 ; i++) {
            for(var j = 0 ; j < 100 ; j++)
                visited[i + "_" + j] = 0;
        }
        var temp_matrix = this.state.matrix;
        stack.push(this.state.start);
        while(stack.length != 0) {
            var temp = stack.pop();
            console.log(visited[temp.x + "_" + temp.y]);
            visited[temp.x + "_" + temp.y] = 1;
            document.getElementById(temp.x + "_" + temp.y).style.backgroundColor = "green";
            var x = temp.x + 1;
            var y = temp.y;
            console.log(x);
            if(temp_matrix[temp.x+1][temp.y] === 0 && visited[x + "_" + y] === 0) {
                stack.push({x:temp.x+1 , y:temp.y});
            }
            x = temp.x;
            y = temp.y+1;
            console.log(x+"_"+y);
            if(temp_matrix[temp.x][temp.y+1] === 0 && visited[x + "_" + y] === 0) {
                stack.push({x:temp.x , y:temp.y+1});
            }
            x = temp.x-1;
            y = temp.y;
            console.log(x+"_"+y);
            if(temp_matrix[temp.x-1][temp.y] === 0 && visited[x + "_" + y] === 0) {
                stack.push({x:temp.x-1 , y:temp.y});
            }
            x = temp.x;
            y = temp.y-1;
            console.log(x+"_"+y);
            if(temp_matrix[temp.x][temp.y-1] === 0 && visited[x + "_" + y] === 0) {
                stack.push({x:temp.x , y:temp.y-1});
            }
        }
    }


  render() {
    console.log(this.state.show);
    return (
      <div style = {{paddingTop : "50px"}}>
          {this.state.maze.map(it => {
              return it;
          })}
        <div style = {{position : "fixed" , height : "50px" , width : "50px" , borderRadius : "50px" , top : "90%" , left : "50%" , backgroundColor : "rgba(135, 219, 61, 0.9)" , color : "white" , textAlign: "center" , lineHeight: "50px" , fontWeight: "bold"}} onClick={this.handlerGo.bind(this)}>
            Go
        </div>
        <div style = {{position : "fixed" , height : "50px" , width : "50px" , borderRadius : "50px" , top : "90%" , left : "90%" , backgroundColor : "rgba(135, 219, 61, 0.9)" , color : "white" , textAlign: "center" , lineHeight: "50px" , fontWeight: "bold"}} onClick={this.onClickStart.bind(this)}>
            Start
        </div>
        <div style = {{position : "fixed" , height : "50px" , width : "50px" , borderRadius : "50px" , top : "90%" , left : "95%" , backgroundColor : "rgba(209, 125, 51, 0.9)" , color : "white" , textAlign: "center" , lineHeight: "50px" , fontWeight: "bold"}} onClick={this.onClickEnd.bind(this)}>
            End
        </div>
      </div>
    );
  }
}


export default Mazecontainer_1;
